const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const yes = require("yes-https");
const config = require("./config");
const graphql = require("./graphql");

dotenv.config();

const server = express();

server.use(yes());
server.use(
  cors({
    origin: config.ORIGIN
  })
);

server.use(bodyParser.json());

server.use("/graphql/explorer", graphql);

server.use(express.static(path.join(__dirname, "../build")));
server.use(express.static(path.join(__dirname, "../public")));

server.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

server.set("port", config.PORT || 8080);

server.listen(server.get("port"), () => {
  console.log(`Find the server at: http://localhost:${server.get("port")}/`);
});
