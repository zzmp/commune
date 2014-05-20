var db     = require('./config');

var roomSchema   = db.roomSchema;

roomSchema.pre('save', function (next) {
  if (this.get('population') === 0) this.remove();
  next();
});

roomSchema.methods.authenticate = function (pass) {
  // No, this is not secure
  return pass === this.get('pass');
};

module.exports = db.mongoose.model('Room', roomSchema);