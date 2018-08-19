const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pizza = mongoose.model(
  'Pizza',
  new Schema({
    name: {
      type: String,
      minlength: [1, 'is required'],
    },
    priceCents: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'should be more than 0'],
    },
  }),
);

module.exports = {
  Pizza,
};
