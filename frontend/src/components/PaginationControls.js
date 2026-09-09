import React from 'react';

function PaginationControls({ page, total, limit, onPageChange }) {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

  return (
    <div style={{ marginTop: '1rem' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      <span style={{ margin: '0 0.5rem' }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
