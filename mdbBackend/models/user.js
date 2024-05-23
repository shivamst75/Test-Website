const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema   ({
  name: String,
  school: String,
  city: String,
  tenth_per:Number,
  stream:String,
  email:String
});

module.exports = mongoose.model('User', UserSchema);
