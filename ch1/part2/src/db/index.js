const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

const Pizza = mongoose.model(
  'Pizza',
  new mongoose.Schema({
    name: {
      type: String,
      minlength: [1, 'is required'],
    },
    likesCount: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'should be more than 0'],
    },
    priceCents: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'should be more than 0'],
    },
  }),
);

module.exports = async url => {
  await mongoose.connect(
    url,
    {
      useNewUrlParser: true,
    },
  );

  return {
    Pizza,
  };
};
