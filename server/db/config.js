var mongoose = module.exports.mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/commune');

module.exports.roomSchema = mongoose.Schema({
  room: {type: String, unique: true},
  pass: String,
  population: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
});
