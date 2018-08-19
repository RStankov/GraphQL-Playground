module.exports = {
  Query: {
    pizzasAll(_object, _args, { db }) {
      return db.findMany(db.Pizza);
    },
    pizza(_object, { id }, { db }) {
      return db.findOne(db.Pizza, { _id: id });
    },
  },
  Mutation: {
    pizzaLike(_object, { id }, { db }) {
      return db.update(db.Pizza, { id, $inc: { likesCount: 1 } });
    },
  },
  Pizza: {
    id: ({ _id }) => _id,
  },
};
