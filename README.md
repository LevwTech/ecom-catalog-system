# E-Commerce Catalog API

This Node.js API serves as the backend for an e-commerce catalog system. It provides endpoints for managing products, including creation, retrieval, updating, and deletion. Additionally, it supports product search functionality.

## Technologies Used

- MongoDB: Used as the primary database.
- Mongoose: Employed as the ORM (Object-Relational Mapping) for MongoDB.
- Redis: Utilized for caching mechanisms.
- Caching Invalidation: Mechanisms are applied to handle caching invalidation.
- MVC Architecture: Followed for a structured and scalable codebase.
- Multer: Used for handling image uploads.
- AWS S3: Images are uploaded to an S3 bucket.
- Sample environment variables: Refer to the `sample.env` file for setting up environment variables.

## Endpoints

- `POST /products`: Endpoint for creating a new product. Images are uploaded along with product data.
- `GET /products`: Endpoint for retrieving all products.
- `GET /products/:id`: Endpoint for retrieving a specific product by its ID.
- `PUT /products/:id`: Endpoint for updating an existing product.
- `DELETE /products/:id`: Endpoint for deleting a product.
- `GET /products/search`: Endpoint for searching products based on specified criteria.

## Local Development

To run the API locally, follow these steps:

1. Clone the repository.
2. Create a `vars.env` file in the root directory and add the necessary environment variables. You can refer to the `sample.env` file for guidance.
3. Install dependencies by running `npm install`.
4. Start the server in development mode by running `npm run dev`.

Ensure that you have the necessary environment variables configured, including the connection URLs for MongoDB and Redis. If you're using hosted instances of MongoDB and Redis, make sure to provide the appropriate URLs/configuration in the `vars.env` file.