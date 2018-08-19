module.exports = {
  create(model, input) {
    return new Promise(cb => model.create(input, handleMutation(cb)));
  },

  update(model, input) {
    const { id, ...set } = input;

    return new Promise(cb =>
      model.findByIdAndUpdate(
        id,
        { $set: set },
        { new: true },
        handleMutation(cb),
      ),
    );
  },

  async destroy(model, { id }) {
    await model.findByIdAndRemove(id);

    return {
      errors: [],
    };
  },
};

function handleMutation(cb) {
  return (err, node) => {
    if (err) {
      cb({
        node: null,
        errors: mapErrors(err),
      });
    } else {
      cb({
        node,
        errors: [],
      });
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
