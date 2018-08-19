module.exports = {
  pizzasAll(_args, { db }) {
    return db.findMany(db.Pizza);
  },
  pizza({ id }, { db }) {
    return db.findOne(db.Pizza, { _id: id });
  },
  pizzaLike({ id }, { db }) {
    return db.update(db.Pizza, { id, $inc: { likesCount: 1 } });
  },
  Pizza: {
    id: ({ _id }) => _id,
  },
};
