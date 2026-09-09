// MongoDB initialization script for Utkrusht logistics demo
// This script sets up the utkrusht_logistics database with realistic collections
// and sample data to simulate a high-volume shipments workload.

// Switch to application database
var dbName = 'utkrusht_logistics';
var db = db.getSiblingDB(dbName);

// Create an application user (credentials may be referenced by external services)
db.createUser({
  user: 'utkrusht_user',
  pwd: 'utkrusht_pass',
  roles: [{ role: 'readWrite', db: dbName }]
});

// Drop existing collections if any
['shipments','customers','carriers','locations','routes','shipmentEvents','users'].forEach(function (coll) {
  if (db.getCollectionNames().indexOf(coll) !== -1) {
    db[coll].drop();
  }
});

// Customers
var customers = [];
for (var i = 1; i <= 200; i++) {
  customers.push({
    _id: ObjectId(),
    name: 'Customer ' + i,
    email: 'customer' + i + '@example.com',
    accountNumber: 'CUST-' + (1000 + i),
    createdAt: new Date(),
    tier: i % 3 === 0 ? 'enterprise' : (i % 2 === 0 ? 'business' : 'individual')
  });
}
db.customers.insertMany(customers);

// Carriers
var carriers = [
  { _id: ObjectId(), name: 'FastShip Logistics', code: 'FS', mode: 'air' },
  { _id: ObjectId(), name: 'Oceanic Freight', code: 'OF', mode: 'sea' },
  { _id: ObjectId(), name: 'TransRoad Express', code: 'TR', mode: 'road' }
];
db.carriers.insertMany(carriers);

// Locations (hubs/warehouses)
var locations = [];
var cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Seattle', 'Miami', 'Atlanta', 'Dallas'];
for (var j = 0; j < cities.length; j++) {
  locations.push({
    _id: ObjectId(),
    code: 'LOC-' + (j + 1),
    city: cities[j],
    country: 'USA',
    type: j % 2 === 0 ? 'hub' : 'warehouse',
    coordinates: {
      type: 'Point',
      coordinates: [-100 + j * 2, 30 + j]
    }
  });
}
db.locations.insertMany(locations);

// Routes between locations
var routes = [];
for (var a = 0; a < locations.length; a++) {
  for (var b = 0; b < locations.length; b++) {
    if (a !== b) {
      routes.push({
        _id: ObjectId(),
        originLocationId: locations[a]._id,
        destinationLocationId: locations[b]._id,
        estTransitDays: 1 + ((a + b) % 7),
        active: true
      });
    }
  }
}
db.routes.insertMany(routes);

// Users (operations team)
db.users.insertMany([
  { _id: ObjectId(), name: 'Ops Admin', email: 'ops.admin@example.com', role: 'admin' },
  { _id: ObjectId(), name: 'Ops Analyst', email: 'ops.analyst@example.com', role: 'analyst' }
]);

// Shipments
// Simulate tens of thousands of shipments with varied statuses and timestamps
var statuses = ['pending', 'in_transit', 'delivered', 'cancelled'];
var shipmentsBatch = [];
var eventsBatch = [];
var numShipments = 15000;
for (var s = 0; s < numShipments; s++) {
  var customer = customers[s % customers.length];
  var carrier = carriers[s % carriers.length];
  var origin = locations[s % locations.length];
  var destination = locations[(s + 3) % locations.length];
  var route = routes[(s * 13) % routes.length];
  var statusIndex = s % statuses.length;
  var status = statuses[statusIndex];

  var created = new Date(Date.now() - (Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000));
  var updated = new Date(created.getTime() + (Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000));

  var shipmentId = ObjectId();

  shipmentsBatch.push({
    _id: shipmentId,
    trackingNumber: 'TRK-' + (100000 + s),
    customerId: customer._id,
    carrierId: carrier._id,
    originLocationId: origin._id,
    destinationLocationId: destination._id,
    routeId: route._id,
    status: status,
    weightKg: 1 + (s % 50),
    createdAt: created,
    updatedAt: updated,
    priority: s % 10 === 0 ? 'high' : 'normal'
  });

  // Basic shipment events history
  eventsBatch.push({
    _id: ObjectId(),
    shipmentId: shipmentId,
    type: 'created',
    message: 'Shipment created in system',
    timestamp: created
  });
  eventsBatch.push({
    _id: ObjectId(),
    shipmentId: shipmentId,
    type: 'status_change',
    message: 'Shipment moved to status ' + status,
    timestamp: updated
  });

  if (shipmentsBatch.length === 1000) {
    db.shipments.insertMany(shipmentsBatch);
    shipmentsBatch = [];
  }
  if (eventsBatch.length === 2000) {
    db.shipmentEvents.insertMany(eventsBatch);
    eventsBatch = [];
  }
}

if (shipmentsBatch.length > 0) {
  db.shipments.insertMany(shipmentsBatch);
}
if (eventsBatch.length > 0) {
  db.shipmentEvents.insertMany(eventsBatch);
}

// Basic indexes for lookups and relationships
// Additional or adjusted indexes may be needed for optimal listing performance.
db.shipments.createIndex({ trackingNumber: 1 });
db.shipments.createIndex({ customerId: 1 });
db.shipmentEvents.createIndex({ shipmentId: 1, timestamp: -1 });
db.locations.createIndex({ coordinates: '2dsphere' });

// Note: The shipments collection intentionally does not yet include a focused index
// tailored to the main listing and filtering pattern, leaving room for optimization.
