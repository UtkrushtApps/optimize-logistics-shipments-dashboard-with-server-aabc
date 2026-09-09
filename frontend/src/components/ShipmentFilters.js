import React from 'react';

function ShipmentFilters({ status, onStatusChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Status:
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </label>
    </div>
  );
}

export default ShipmentFilters;
