var mongoose = module.exports.mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/commune');

// Drop existing database to prevent hung errors
mongoose.connection.db.dropDatabase();

module.exports.roomSchema = mongoose.Schema({
  leader: String,
  room: {type: String, unique: true},
  pass: String,
  population: {type: Number, default: 1},
  createdAt: {type: Date, default: Date.now}
});
