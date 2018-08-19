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

const resolvers = {
  pizzasAll() {
    return PIZZAS;
  },
  pizza({ id }) {
    return PIZZAS.filter(pizza => pizza.id === id)[0];
  },
  pizzaLike({ id }) {
    const pizza = PIZZAS.filter(pizza => pizza.id === id)[0];
    if (pizza) {
      pizza.likesCount += 1;
    }
    return pizza;
  },
};

const PIZZAS = [
  {
    id: '1',
    name: 'Pizza 1',
    likesCount: 0,
    priceCents: 1000,
  },
  {
    id: '2',
    name: 'Pizza 2',
    likesCount: 0,
    priceCents: 2000,
  },
  {
    id: '3',
    name: 'Pizza 3',
    likesCount: 0,
    priceCents: 2000,
  },
];

module.exports = {
  schema,
  resolvers,
};
