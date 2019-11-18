require("dotenv").config();

const ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : process.env.DEVELOPMENT_URL;

module.exports = {
  PORT: 8080,
  DEBUG: process.env.NODE_ENV === "development",
  ORIGIN,
};
