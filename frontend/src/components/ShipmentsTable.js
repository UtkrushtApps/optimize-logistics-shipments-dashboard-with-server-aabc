import React from 'react';

function ShipmentsTable({ shipments }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Tracking #</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Status</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Weight (kg)</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Priority</th>
          <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((s) => (
          <tr key={s._id}>
            <td style={{ borderBottom: '1px solid #eee' }}>{s.trackingNumber}</td>
            <td style={{ borderBottom: '1px solid #eee' }}>{s.status}</td>
            <td style={{ borderBottom: '1px solid #eee' }}>{s.weightKg}</td>
            <td style={{ borderBottom: '1px solid #eee' }}>{s.priority}</td>
            <td style={{ borderBottom: '1px solid #eee' }}>{new Date(s.updatedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ShipmentsTable;
