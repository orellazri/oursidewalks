const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");
const { Parser } = require("json2csv");

exports.generateReport = functions.region("europe-west1").https.onRequest((request, response) => {
  // TODO: Change this after deploying web app
  response.set("Access-Control-Allow-Origin", "*");

  const bigquery = new BigQuery({ projectId: "ourstreets-app" });
  bigquery
    .query({
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
    })
    .then((results) => {
      function transform(item) {
        console.log(item);
      }

      // Initialize json2csv with fields
      var fields = [
        { label: "שם מלא", value: "full_name" },
        { label: "כתובת אימייל", value: "email" },
        { label: "סוג מפגע", value: "hazard_type" },
        { label: "טקסט חופשי", value: "freetext" },
        { label: "קו אורך (Longitude)", value: "longitude" },
        { label: "קו רוחב (Latitude)", value: "latitude" },
        { label: "תמונות", value: "photos" },
        { label: "הסכמה", value: "consent" },
        { label: "תאריך דיווח", value: "created_at" },
      ];
      const json2csv = new Parser({ fields: fields, withBOM: true, excelStrings: true });
      try {
        // Unify results for formatting
        results[0].map((item) => {
          // Replace BigQuery date with string date
          item.created_at = item.created_at.value;

          // Replace consent boolean
          item.consent = item.consent ? "כן" : "לא";
        });

        // Parse data and send csv
        const csv = json2csv.parse(results[0]);
        response.attachment("report.csv").send(csv);
      } catch (error) {
        console.log(error);
        response.status(500).send("Could not generate report");
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send("Could not generate report");
    });
});
