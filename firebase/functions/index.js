const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { BigQuery } = require("@google-cloud/bigquery");
const { Parser } = require("json2csv");
const { Client } = require("@googlemaps/google-maps-services-js");
const express = require("express");
const basicAuth = require("express-basic-auth");
const nodemailer = require("nodemailer");

// Helper function to check if a string contains Hebrew characters
function contains_heb(str) {
  return /[\u0590-\u05FF]/.test(str);
}

// Reverse geocode location latitude & longitude to address and city
async function reverseGeocode(client, latitude, longitude) {
  const response = await client.reverseGeocode({
    params: {
      latlng: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      langauge: "iw",
      key: process.env.MAPS_API_KEY,
    },
  });
  let address = response.data.results[0].formatted_address;
  let city = "";
  for (comp of response.data.results[0].address_components) {
    if (comp.types.includes("political")) {
      if (city == "") {
        city = comp.short_name;
      }
      if (contains_heb(comp.short_name)) {
        city = comp.short_name;
        break;
      }
    }
  }

  return [address, city];
}

// Unify report
async function unifyReport(results) {
  // Initialize Google Maps SDK client
  const client = new Client({});

  // Unify results for formatting
  for (item of results[0]) {
    // Replace BigQuery date with string date
    item.created_at = item.created_at.value;

    // Replace consent boolean
    item.consent = item.consent == "true" ? "כן" : "לא";

    // Reverse geocode location
    let geocode = await reverseGeocode(client, item.latitude, item.longitude);
    item.address = geocode[0];
    item.city = geocode[1];
  }
}

// Initialize express and basic auth (username & password)
const app = express();
let users = {};
users[process.env.USERNAME] = process.env.PASSWORD;
app.use(
  basicAuth({
    challenge: true,
    users,
  })
);

// Initialize nodemailer to send emails
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// var serviceAccount = require("./serviceaccount.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
admin.initializeApp();

app.get("/", async (request, response) => {
  try {
    const bigquery = new BigQuery({ projectId: "ourstreets-app" });
    const results = await bigquery.query({
      query:
        "SELECT \
          JSON_VALUE(users.data, '$.full_name') AS full_name, \
          JSON_VALUE(users.data, '$.email') AS email, \
          JSON_VALUE(hazard_types.data, '$.title') AS hazard_type, \
          JSON_VALUE(reports.data, '$.freetext') AS freetext, \
          JSON_VALUE(reports.data, '$.location._longitude') AS longitude, \
          JSON_VALUE(reports.data, '$.location._latitude') AS latitude, \
          JSON_VALUE_ARRAY(reports.data, '$.photos') AS photos, \
          JSON_VALUE(reports.data, '$.consent') AS consent, \
          DATE(TIMESTAMP_SECONDS(CAST(JSON_EXTRACT(reports.data, '$.created_at._seconds') AS int64))) AS created_at \
        FROM `ourstreets-app.firestore_reports.reports_raw_latest` reports \
        LEFT JOIN `ourstreets-app.firestore_users.users_raw_latest` users \
        ON JSON_VALUE(reports.data, '$.user_id') = users.document_id \
        LEFT JOIN `ourstreets-app.firestore_hazard_types.hazard_types_raw_latest` hazard_types \
        ON JSON_VALUE(reports.data, '$.hazard_type') = hazard_types.document_id",
    });

    await unifyReport(results);

    // Parse data and send csv
    var fields = [
      { label: "שם מלא", value: "full_name" },
      { label: "כתובת אימייל", value: "email" },
      { label: "סוג מפגע", value: "hazard_type" },
      { label: "טקסט חופשי", value: "freetext" },
      { label: "כתובת", value: "address" },
      { label: "עיר", value: "city" },
      { label: "תמונות", value: "photos" },
      { label: "הסכמה", value: "consent" },
      { label: "תאריך דיווח", value: "created_at" },
      { label: "קו אורך (Longitude)", value: "longitude" },
      { label: "קו רוחב (Latitude)", value: "latitude" },
    ];
    const json2csv = new Parser({ fields: fields, withBOM: true, excelStrings: true });
    const csv = json2csv.parse(results[0]);
    response.attachment("report.csv").send(csv);
  } catch (error) {
    console.log(error);
    response.status(500).send("Could not generate report");
  }
});

exports.generateReport = functions.region("europe-west1").https.onRequest(app);

exports.sendReportEmail = functions
  .region("europe-west1")
  .firestore.document("reports/{docId}")
  .onCreate(async (snap, context) => {
    try {
      // Get created document's data
      let data = snap.data();

      // Fetch user details
      let full_name = "";
      let email = "";
      let phone = "";

      if (data.user_id != "") {
        const bigquery = new BigQuery({ projectId: "ourstreets-app" });
        const results = await bigquery.query({
          query: `SELECT 
          JSON_VALUE(users.data, '$.full_name') AS full_name,
          JSON_VALUE(users.data, '$.email') AS email,
          JSON_VALUE(users.data, '$.phone') AS phone,
        FROM \`ourstreets-app.firestore_users.users_raw_latest\` users
        WHERE users.document_id = "${data.user_id}"`,
        });
        full_name = results[0][0].full_name;
        email = results[0][0].email;
        phone = results[0][0].phone;
      }

      // Fetch hazard type
      const bigquery = new BigQuery({ projectId: "ourstreets-app" });
      const results = await bigquery.query({
        query: `SELECT 
                JSON_VALUE(hazard_types.data, '$.title') AS title,
              FROM \`ourstreets-app.firestore_hazard_types.hazard_types_raw_latest\` hazard_types
              WHERE hazard_types.document_id = "${data.hazard_type}"`,
      });
      let { title: hazard_title } = results[0][0];

      // Reverse geocode location
      const client = new Client({});
      let [address, city] = await reverseGeocode(client, data.location._latitude, data.location._longitude);

      // Get photos urls
      let photoUrls = [];
      for (photoUrl of data.photos) {
        const bucket = admin.storage().bucket("gs://ourstreets-app.appspot.com");
        const url = await bucket.file(photoUrl).getSignedUrl({ action: "read", expires: "10-25-2500" });
        photoUrls.push(url[0]);
      }

      let mailContent = `
        <h2>דיווח חדש התקבל</h2>
        <p><strong>סוג מפגע: </strong>${hazard_title}</p>
        <p><strong>טקסט חופשי: </strong>${data.freetext}</p>
        <p><strong>כתובת: </strong>${address}</p>
        <p><strong>עיר: </strong>${city}</p>`;

      if (data.user_id != "") {
        mailContent += `
          <hr />
          <p><strong>הסכמה לשיתוף פרטים: </strong>${data.consent == "true" ? "כן" : "לא"}</p>
          <p><strong>שם: </strong>${full_name}</p>
          <p><strong>אימייל: </strong>${email}</p>
          <p><strong>מספר טלפון: </strong>${phone}</p>`;
      }

      let attachments = [];
      let i = 0;
      for (url of photoUrls) {
        attachments.push({ filename: `${i}.jpg`, path: url });
        i++;
      }

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "דיווח חדש התקבל",
        html: mailContent,
        attachments,
      };

      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
