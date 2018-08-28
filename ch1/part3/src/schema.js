const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query {
    pizzasAll(filters: PizzaFilterInput): [Pizza!]!
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

  input PizzaFilterInput {
    nameContains: String,
    likesMoreThan: Int,
    likesLessThan: Int,
    priceCentsMoreThan: Int,
    priceCentsLessThan: Int,
  }
`;

const filterPizzaRules = require('./filterPizzaRules');

const resolvers = {
  Query: {
    pizzasAll(_obj, { filters } = {}, { db }) {
      return db.Pizza.find(filterPizzaRules(filters));
    },
    pizza(_obj, { id }, { db }) {
      return db.Pizza.findOne({ _id: id });
    },
  },
  Mutation: {
    pizzaLike(_obj, { id }, { db }) {
      return db.Pizza.findOneAndUpdate(
        { _id: id },
        { $inc: { likesCount: 1 } },
        { new: true },
      );
    },
  },
  Pizza: {
    id: ({ _id }) => _id,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
