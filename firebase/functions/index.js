const functions = require("firebase-functions");
const { BigQuery } = require("@google-cloud/bigquery");

exports.generateReport = functions.region("europe-west1").https.onRequest((request, response) => {
  const bigquery = new BigQuery({ projectId: "ourstreets-app" });
  bigquery
    .query({
      query:
        "SELECT \
          JSON_VALUE(DATA, '$.hazard_type') AS hazard_type, \
          JSON_VALUE(DATA, '$.user_id') AS user_id, \
          JSON_VALUE(DATA, '$.location._longitude') AS longitude, \
          JSON_VALUE(DATA, '$.location._latitude') AS latitude, \
          JSON_VALUE_ARRAY(DATA, '$.photos') AS photos, \
          JSON_VALUE(DATA, '$.freetext') AS freetext, \
          JSON_VALUE(DATA, '$.consent') AS consent, \
          DATE(TIMESTAMP_SECONDS(CAST(JSON_EXTRACT(DATA, '$.created_at._seconds') AS int64))) AS created_at \
        FROM `ourstreets-app.firestore_reports.reports_raw_latest`",
    })
    .then((results) => {
      response.send(results);
    })
    .catch((error) => {
      console.log(error);
      response.send("Could not generate report");
    });
});
