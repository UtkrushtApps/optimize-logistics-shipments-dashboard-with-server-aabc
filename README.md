# Task Overview

The Utkrusht logistics team uses this MERN-based dashboard to monitor tens of thousands of shipment records across multiple carriers and routes. Today, the shipments listing endpoint returns all shipments in a single response, and the React frontend performs filtering and pagination in the browser, which leads to slow responses and sluggish UI as data volume grows.

Your objective is to improve the performance and usability of the shipments listing flow across the full stack. You must extend the existing Node.js/Express API to support efficient server-side pagination and filtering for shipments, optimize MongoDB queries and indexing strategy for common access patterns, and refactor the React shipments view to consume the new API while providing a smooth user experience.

## Database Access & API Configuration

- **MongoDB Host:** `<DROPLET_IP>`
- **MongoDB Port:** `27017`
- **Database Name:** `utkrusht_logistics`
- **Logical Application User:**
  - Username: `utkrusht_user`
  - Password: `utkrusht_pass`
- **MongoDB Connection (backend):** The backend connects to MongoDB at `mongodb://mongo:27017/utkrusht_logistics` within the Docker network.
- **Backend API Base URL (from browser):** `http://<DROPLET_IP>:5000/api/v1`
- **Frontend URL:** `http://<DROPLET_IP>:3000`

The database is pre-populated with realistic logistics data, including shipments, customers, carriers, locations, routes, shipment events, and users. The current shipments API returns a large unpaginated dataset which is the main target for optimization.

## Guidance

- **Architecture & Design:**
  - Work within the existing structure: models → services → controllers → routes on the backend, and pages → components → services on the frontend.
  - Keep clear separation of concerns: controllers should orchestrate, services should interact with the database, models define schemas.
  - Ensure that any new functionality is easy to extend and test.

- **MongoDB Considerations:**
  - Understand which fields are used most frequently for filtering and sorting (e.g., status, updated timestamps, carrier, origin/destination).
  - Design or adjust indexes to support these queries efficiently, considering compound indexes where appropriate.
  - Aim for query patterns that can be supported by covered queries and avoid unnecessary full-collection scans on large data sets.
  - Use `explain()` during development to reason about query plans and ensure that the right indexes are used.

- **Backend API Design:**
  - Introduce query parameters on the shipments endpoint for pagination and filtering (e.g., status, page, limit).
  - Validate and sanitize incoming query parameters; return appropriate HTTP status codes for invalid input.
  - Avoid loading the entire shipments collection into memory for each request; push filtering, sorting, and pagination into the database layer.
  - Consider how you might introduce light-weight caching or reuse of results if the same queries are repeated frequently.
  - Make sure errors are propagated through the existing error-handling middleware.

- **React Frontend Implementation:**
  - Refactor the shipments page to request only the data needed for the current page from the backend.
  - Manage loading and error states cleanly so that the user understands what is happening.
  - Use React hooks to avoid unnecessary re-renders; memoize derived data where it is beneficial.
  - Keep network usage reasonable by avoiding repeated calls for the same data when not needed.

- **State Management & Performance:**
  - When managing pagination and filters, keep state localized to the page or use a simple shared state if needed, rather than re-rendering the entire application.
  - Ensure that large lists are rendered efficiently, and avoid heavy computations during each render.
  - Think about how client-side and server-side caching can complement each other.

- **Scalability & Maintainability:**
  - Design your changes so that they continue to work as data volumes grow (e.g., more shipments, more carriers, more locations).
  - Keep code clear and consistent with existing style and structure.
  - Add or adjust abstractions only where they genuinely improve clarity and reuse.

## Objectives

- Implement a server-side pagination mechanism for the shipments listing endpoint that accepts query parameters for page and limit and integrates cleanly with the existing Express routing and controller structure.
- Add support for filtering shipments by commonly-used attributes (such as status), ensuring that queries are efficient at the database level.
- Optimize MongoDB queries and indexes for the shipments listing flow so that typical listing requests avoid full-scans and scale as the number of shipments increases.
- Refactor the React shipments page to consume the updated API, including pagination controls and filtering UI, while providing clear loading and error states.
- Ensure the overall solution remains production-ready: robust error handling, clear separation of concerns, and code that is easy to extend and maintain.

## How to Verify

- **API Behavior:**
  - Use an API client such as Postman or curl to call the shipments endpoint with different query parameter combinations.
  - Verify that the API returns only the shipments for the requested page and limit, and that filtering (e.g., by status) is respected.
  - Confirm that invalid parameters (such as negative pages, excessively high limits, or unsupported statuses) result in clear, appropriate HTTP error responses.

- **Performance Checks:**
  - Compare response times for the shipments listing before and after your changes using the browser Network panel or an API client.
  - Run `explain()` on your primary shipments listing query to ensure that it uses an appropriate index and does not perform unnecessary collection scans.
  - Observe memory usage and CPU spikes on the backend when requesting large pages or when filters are applied.

- **Frontend Verification:**
  - Open the shipments page in the browser and verify that data loads quickly, with visible loading indicators.
  - Use pagination controls to move between pages and confirm that the correct shipments are loaded without reloading the entire app.
  - Toggle filters (such as status) and ensure that results update correctly and consistently.
  - Inspect React components using React DevTools to make sure that only necessary components re-render when pagination or filters change.

- **Code Quality:**
  - Review your changes to confirm they align with the existing architecture and coding style.
  - Check that your additions are modular, testable, and maintainable, and that you have not introduced unnecessary coupling.
  - Ensure that logs and errors are meaningful and routed through the centralized middleware.
