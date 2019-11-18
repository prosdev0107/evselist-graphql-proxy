const express = require("express");
const gql = require("graphql-tag");
const apolloClient = require("./apolloClient");
const {DEBUG} = require("./config");

const router = express.Router();

const runQuery = async (query, client) => {
  if (!client) {
    throw Error("An Apollo client is required to perform the query");
  }

  if (typeof query === "string") {
    throw Error('The "query" parameter should be a JS object');
  }

  const queryData = query.query;
  if (JSON.stringify(queryData).includes("internal")) {
    throw Error('The "query" includes "internal" values!');
  }

  query.query = gql`
    ${queryData}
  `;

  return client.query(query);
};

router.use(async (req, res) => {
  const query = req.body;
  if (DEBUG) console.log("graphql query: ", query);

  runQuery(query, apolloClient)
    .then(response => {
      if (DEBUG) console.log("queryResults: ", response.data);
      res.status(200).json({
        success: true,
        data: response.data
      });
    })
    .catch(error => {
      if (DEBUG) console.log("error: ", error);
      res.status(400).json({
        success: false,
        error
      });
    });
});

module.exports = router;
