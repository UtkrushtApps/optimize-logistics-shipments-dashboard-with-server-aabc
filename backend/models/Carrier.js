const mongoose = require('mongoose');
const { Schema } = mongoose;

const carrierSchema = new Schema(
  {
    name: String,
    code: String,
    mode: String
  },
  { collection: 'carriers' }
);

module.exports = mongoose.model('Carrier', carrierSchema);
