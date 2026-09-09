import React, { useEffect, useState } from 'react';
import ShipmentsTable from '../components/ShipmentsTable';
import ShipmentFilters from '../components/ShipmentFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import PaginationControls from '../components/PaginationControls';
import api from '../services/api';

function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(1000); // high default, current implementation loads a lot of data
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Current implementation requests all shipments with optional in-memory
        // filtering and pagination applied on the server. The endpoint returns
        // a large dataset by default.
        const response = await api.get('/shipments');
        if (isCancelled) return;
        const data = response.data;
        setShipments(data.items || []);
        setTotal(data.total || 0);
      } catch (err) {
        if (isCancelled) return;
        setError('Failed to load shipments');
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Current implementation does not re-fetch from the backend; status is
    // used only for basic client-side filtering.
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Current implementation does not request different pages from the backend;
    // pagination controls are mostly cosmetic until the API supports it.
  };

  // Client-side filtering based on status, using the full shipments list.
  const filteredShipments = status
    ? shipments.filter((s) => s.status === status)
    : shipments;

  // Client-side pagination based on page and limit.
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageItems = filteredShipments.slice(start, end);

  return (
    <div>
      <h2>Shipments</h2>
      <ShipmentFilters status={status} onStatusChange={handleStatusChange} />
      {loading && <LoadingSpinner />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <>
          <ShipmentsTable shipments={pageItems} />
          <PaginationControls
            page={page}
            total={filteredShipments.length}
            limit={limit}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default ShipmentsPage;
