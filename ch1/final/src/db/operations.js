const mongoose = require('mongoose');

module.exports = {
  findMany(model, input = {}) {
    return model.find(input);
  },

  findOne(model, input = {}) {
    return model.findOne(input);
  },

  create(model, input) {
    return new Promise(cb => {
      model.create(input, handleMutation(cb));
    });
  },

  update(model, input) {
    const { id, $inc, ...set } = input;

    return new Promise(cb =>
      model.findOneAndUpdate(
        { _id: id },
        { $set: set, $inc },
        { new: true },
        handleMutation(cb),
      ),
    );
  },
};

function handleMutation(cb) {
  return (err, node) => {
    if (err) {
      // cb({
      //   node: null,
      //   errors: mapErrors(err),
      // });
      cb(null);
    } else {
      cb(node);
      // cb({
      //   node,
      //   errors: [],
      // });
    }
  };
}

function mapErrors(err) {
  // NOTE(rstankov): E11000 duplicate key error
  if (err.code === 11000) {
    // NOTE(rstankov): Message format:
    //   -> 'E11000 duplicate key error collection: myapp.clients index: name_1 dup key
    const match = err.message.match(/index: (\w+)_/);
    const name = match ? match[1] : 'base';

    return [
      {
        field: name,
        message: 'should be unique',
      },
    ];
  }

  if (!err.errors) {
    return [
      {
        field: 'base',
        message: 'internal error',
      },
    ];
  }

  return Object.keys(err.errors).map(key => ({
    field: key,
    message: err.errors[key].message,
  }));
}
