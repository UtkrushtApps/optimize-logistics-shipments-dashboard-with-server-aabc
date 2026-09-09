const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    code: String,
    city: String,
    country: String,
    type: String,
    coordinates: {
      type: { type: String },
      coordinates: [Number]
    }
  },
  { collection: 'locations' }
);

locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
