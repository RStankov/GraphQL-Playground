const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');


const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(3000);
