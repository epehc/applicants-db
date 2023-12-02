# Back-End for applicants-db

This is the back-end part of the Dunder Mifflin Applicant Tracking System, built using Node.js, Express, and PostgreSQL. It handles the API endpoints for managing applicant data in the system.

## Features

- RESTful API endpoints for managing applicants.
- Integration with a PostgreSQL database for persistent data storage.
- Middleware for effective request handling and error management.

## Installation

First, clone the main project repository (if not already done) and navigate to the `back-end` directory:

To install the necessary dependencies
```bash
npm install
```

## To start the application

```bash
npm start
```

The server will start running on http://localhost:8000 or on another port if you have configured it differently.

## API Endpoints
The server provides several RESTful API endpoints:

- GET /applicants: Fetches all applicants.
- POST /applicants: Adds a new applicant.
- PUT /applicants/:id: Updates an existing applicant.
- DELETE /applicants/:id: Deletes an applicant.

## Environment Setup
Make sure to set up the `.env` file correctly with the required PostgreSQL credentials and other necessary environment variables:

```plaintext
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your-db-name
```

Replace the placeholders with your actual PostgreSQL database details.