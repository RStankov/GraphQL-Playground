const express = require('express');
const graphqlHTTP = require('express-graphql');
const createDatabase = require('./db');
const schema = require('./graphql');

module.exports = async function startServer({ port, databaseUrl }) {
  const db = await createDatabase(databaseUrl);

  const app = express();

  app.use(
    '/graphql',
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
