const mongoose = require('mongoose');
const { Schema } = mongoose;

const shipmentSchema = new Schema(
  {
    trackingNumber: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    carrierId: { type: Schema.Types.ObjectId, ref: 'Carrier', required: true },
    originLocationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    destinationLocationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    status: { type: String, enum: ['pending', 'in_transit', 'delivered', 'cancelled'], required: true },
    weightKg: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    priority: { type: String, enum: ['normal', 'high'], default: 'normal' }
  },
  {
    collection: 'shipments'
  }
);

// Existing index focused on trackingNumber for lookups.
// Listing and filtering performance can be further optimized.
shipmentSchema.index({ trackingNumber: 1 });

module.exports = mongoose.model('Shipment', shipmentSchema);
