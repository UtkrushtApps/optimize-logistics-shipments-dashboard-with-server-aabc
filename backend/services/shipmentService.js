const Shipment = require('../models/Shipment');

// Service responsible for interacting with the shipments collection.
// Currently it fetches all shipments from MongoDB and returns them
// as plain JavaScript objects. Consumers then perform filtering and
// pagination in memory.

async function fetchAllShipments() {
  const shipments = await Shipment.find({}).lean().exec();
  return shipments;
}

module.exports = {
  fetchAllShipments
};
