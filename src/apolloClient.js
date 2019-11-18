const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const fetch = require("node-fetch");

const GRAPHCMS_API = process.env.GRAPHCMS_API;

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API, fetch }),
  cache: new InMemoryCache()
});

module.exports = apolloClient;
