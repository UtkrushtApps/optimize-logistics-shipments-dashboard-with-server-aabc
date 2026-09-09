const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: String,
    email: String,
    accountNumber: String,
    tier: String,
    createdAt: Date
  },
  { collection: 'customers' }
);

module.exports = mongoose.model('Customer', customerSchema);
