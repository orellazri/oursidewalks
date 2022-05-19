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
          JSON_VALUE(reports.data, '$.hazard_type') AS hazard_type, \
          JSON_VALUE(reports.data, '$.freetext') AS freetext, \
          JSON_VALUE(reports.data, '$.location._longitude') AS longitude, \
          JSON_VALUE(reports.data, '$.location._latitude') AS latitude, \
          JSON_VALUE_ARRAY(reports.data, '$.photos') AS photos, \
          JSON_VALUE(reports.data, '$.consent') AS consent, \
          DATE(TIMESTAMP_SECONDS(CAST(JSON_EXTRACT(reports.data, '$.created_at._seconds') AS int64))) AS created_at \
        FROM `ourstreets-app.firestore_reports.reports_raw_latest` reports \
        LEFT JOIN `ourstreets-app.firestore_users.users_raw_latest` users \
        ON JSON_VALUE(reports.data, '$.user_id') = users.document_id",
    })
    .then((results) => {
      // Initialize json2csv with fields
      var fields = ["user_id", "hazard_type", "freetext", "longitude", "latitude", "photos", "consent", "created_at"];
      const json2csv = new Parser({ fields: fields, withBOM: true });
      try {
        // Replace biq query date with string date
        results[0].map((item) => {
          item.created_at = item.created_at.value;
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
