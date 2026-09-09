const shipmentService = require('../services/shipmentService');

// Controller for listing shipments.
// Currently delegates to a service that loads all shipments into memory
// and performs basic transformations before returning them.
// This approach does not scale well as data volume grows.

async function listShipments(req, res, next) {
  try {
    const { status, page, limit } = req.query;

    // Query parameters are accepted but not yet used for efficient
    // server-side pagination or filtering. The current behavior
    // always returns the full shipments list.

    const shipments = await shipmentService.fetchAllShipments();

    // Basic in-memory filtering based on status, if provided.
    let filtered = shipments;
    if (status) {
      filtered = shipments.filter((s) => s.status === status);
    }

    // Basic in-memory pagination (for demonstration only);
    // this is inefficient on large collections and should be
    // replaced with a more scalable approach.
    let pageNumber = parseInt(page, 10) || 1;
    let pageSize = parseInt(limit, 10) || filtered.length;
    if (pageNumber < 1) pageNumber = 1;
    if (pageSize < 1) pageSize = filtered.length;

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = filtered.slice(start, end);

    res.json({
      total: filtered.length,
      page: pageNumber,
      limit: pageSize,
      items: pageItems
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listShipments
};
