const mongoose = require('mongoose');
const models = require('./models');
const operations = require('./operations');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = async (url) => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });

  return { ...models, ...operations };
};
