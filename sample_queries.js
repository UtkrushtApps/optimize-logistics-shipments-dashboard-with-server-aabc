// Sample queries and API calls for the Utkrusht logistics shipments dashboard.
// These examples illustrate current behavior and help validate improvements.

// 1. Fetch all shipments (current implementation)
//    This call returns a large payload since the backend retrieves all
//    documents from the shipments collection.
//
// curl http://<DROPLET_IP>:5000/api/v1/shipments

// 2. Basic client-side filtering by status via frontend
//    The frontend currently applies status filtering and pagination in memory
//    after loading all shipments from the backend.

// 3. Observing performance
//    Use your browser's Network panel or an API client to observe response
//    times and payload sizes for the shipments endpoint under the current
//    implementation. This will help you compare before and after states
//    once you introduce server-side pagination and optimized querying.

// 4. Health check endpoint
//
// curl http://<DROPLET_IP>:5000/health

// As you enhance the application, you may introduce additional query
// parameters on the shipments endpoint (for example, pagination and
// filtering). Use tools like curl, Postman, or your browser to validate
// that these parameters behave as expected and that performance improves.
