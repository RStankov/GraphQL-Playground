const filterPizzaRules = require('../filterPizzaRules');

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

