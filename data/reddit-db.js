/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = process.env.MONGODB;
mongoose.connect(
  url,
  {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected successfully to database');
  })
  .catch(error => {
    console.log("Failed to connect to database with error:", error);
  }
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
