const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Database connected successfully');
});

module.exports = db