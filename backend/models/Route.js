const mongoose = require('mongoose');
const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    originLocationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    destinationLocationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    estTransitDays: Number,
    active: Boolean
  },
  { collection: 'routes' }
);

module.exports = mongoose.model('Route', routeSchema);
