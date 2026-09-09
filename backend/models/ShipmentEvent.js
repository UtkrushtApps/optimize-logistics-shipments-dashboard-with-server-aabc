const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipmentEventSchema = new Schema(
  {
    shipmentId: { type: Schema.Types.ObjectId, ref: 'Shipment' },
    type: String,
    message: String,
    timestamp: Date
  },
  { collection: 'shipmentEvents' }
);

shipmentEventSchema.index({ shipmentId: 1, timestamp: -1 });

module.exports = mongoose.model('ShipmentEvent', shipmentEventSchema);
