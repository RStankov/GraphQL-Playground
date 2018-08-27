const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');
const createDatabase = require('./src/db');

async function startServer({ port, databaseUrl }) {
  const db = await createDatabase(databaseUrl);

  const app = express();

  app.use(
    '/',
    graphqlHTTP({
      schema,
      graphiql: true,
      context: {
        db,
      },
    }),
  );

  app.listen(port, () => {
    console.log(`GraphQL server running on port ${port}.`);
  });

  return app;
};

startServer({
  port: process.env.PORT || 3000,
  databaseUrl: 'mongodb://127.0.0.1:27017/pizzabox',
});
