const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");
const { Parser } = require("json2csv");

exports.generateReport = functions.region("europe-west1").https.onRequest((request, response) => {
  const bigquery = new BigQuery({ projectId: "ourstreets-app" });
  bigquery
    .query({
      query:
        "SELECT \
          JSON_VALUE(DATA, '$.user_id') AS user_id, \
          JSON_VALUE(DATA, '$.hazard_type') AS hazard_type, \
          JSON_VALUE(DATA, '$.freetext') AS freetext, \
          JSON_VALUE(DATA, '$.location._longitude') AS longitude, \
          JSON_VALUE(DATA, '$.location._latitude') AS latitude, \
          JSON_VALUE_ARRAY(DATA, '$.photos') AS photos, \
          JSON_VALUE(DATA, '$.consent') AS consent, \
          DATE(TIMESTAMP_SECONDS(CAST(JSON_EXTRACT(DATA, '$.created_at._seconds') AS int64))) AS created_at \
        FROM `ourstreets-app.firestore_reports.reports_raw_latest`",
    })
    .then((results) => {
      var fields = ["user_id", "hazard_type", "freetext", "longitude", "latitude", "photos", "consent", "created_at"];
      const json2csv = new Parser({ fields: fields });
      try {
        const csv = json2csv.parse(results[0]);
        response.attachment("report.csv");
        response.status(200).send(csv);
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
