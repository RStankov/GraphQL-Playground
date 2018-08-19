const startServer = require('./src/startServer');

startServer({
  port: process.env.PORT || 3000,
  databaseUrl: 'mongodb://127.0.0.1:27017/pizzabox',
});
