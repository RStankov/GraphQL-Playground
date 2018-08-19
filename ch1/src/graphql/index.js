const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    pizzasAll: [Pizza!]!
    pizza(id: ID!): Pizza
  }

  type Mutation {
    pizzaLike(id: ID!): Pizza
  }

  type Pizza {
    id: ID!
    name: String!
    likesCount: Int!
    priceCents: Int!
  }
`);

const staticResolvers = require('./staticResolvers');
const databaseResolvers = require('./databaseResolvers');

module.exports = {
  schema,
  staticResolvers,
  databaseResolvers,
};
