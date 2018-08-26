const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query {
    pizzasAll: [Pizza!]!
    pizza(id: ID!): Pizza
  }

  type Pizza {
    id: ID!
    name: String!
    likesCount: Int!
    priceCents: Int!
  }
`;

const PIZZAS = [
  {
    id: '1',
    name: 'Pizza',
    likesCount: 0,
    priceCents: '500',
  },
];

const resolvers = {
  Query: {
    pizzasAll() {
      return PIZZAS;
    },
    pizza(_obj, { id }) {
      return PIZZAS.filter(pizza => pizza.id === id)[0];
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
