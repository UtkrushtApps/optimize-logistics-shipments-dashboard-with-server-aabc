const express = require('express');
const router = express.Router();

const shipmentsController = require('../controllers/shipmentsController');

// Current implementation returns all shipments without pagination or filtering.
// This route is the primary target for improvement.
router.get('/', shipmentsController.listShipments);

module.exports = router;
