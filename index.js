const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(3000);
