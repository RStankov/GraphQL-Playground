const mongoose = require('mongoose');
const models = require('./models');
const repos = require('./models');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });

  return { ...models };
};
