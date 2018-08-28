module.exports = `
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

