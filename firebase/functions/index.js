const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");
const { Parser } = require("json2csv");
const { Client } = require("@googlemaps/google-maps-services-js");
const express = require("express");
const basicAuth = require("express-basic-auth");

// Helper function to check if a string contains Hebrew characters
function contains_heb(str) {
  return /[\u0590-\u05FF]/.test(str);
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
    const response = await client.reverseGeocode({
      params: {
        latlng: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) },
        langauge: "iw",
        key: process.env.MAPS_API_KEY,
      },
    });
    item.address = response.data.results[0].formatted_address;
    item.city = "";
    for (comp of response.data.results[0].address_components) {
      if (comp.types.includes("political")) {
        if (item.city == "") {
          item.city = comp.short_name;
        }
        if (contains_heb(comp.short_name)) {
          item.city = comp.short_name;
          break;
        }
      }
    }
  }
}

const app = express();
app.use(
  basicAuth({
    challenge: true,
    users: { admin: process.env.PASSWORD },
  })
);

app.get("/", async (request, response) => {
  try {
    // TODO: Change this after deploying web app
    response.set("Access-Control-Allow-Origin", "*");

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
