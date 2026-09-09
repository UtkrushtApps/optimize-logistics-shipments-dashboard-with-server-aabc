const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    role: String
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
