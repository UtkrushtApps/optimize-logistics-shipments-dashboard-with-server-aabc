const axios = require('axios');

// Simple API client for the frontend. Currently uses a fixed base URL
// pointing at the backend service exposed on port 5000.

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

module.exports = api;
