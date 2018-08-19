const { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var resolvers = {
  hello: () => {
    return 'Hello world!';
  },
};

module.exports = {
  schema,
  resolvers,
};
