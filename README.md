# Online Store

Skeleton for an Express-based online store app, using MongoDB for data storage and basic authentication functionality.  
* Includes SendGrid integration for transactional emails such as registration and password reset.

### refrence branch: https://github.com/kalpesh05/oneStepAway
---

## Project Structure

### 1. **api**
Contains the core logic for making API endpoints available.

- **constants**
  - `errorMessage`: Contains all error messages used throughout the project.
  - `successMessage`: Contains all success messages used throughout the project.
  
- **controller**  
  Contains all controllers, where business logic for handling product, category, and authentication-related tasks is written.
  
- **middlewares**  
  Middleware functions for authentication (`apiAuth`), response formatting, and request validation.

- **routes**  
  Defines all API endpoints for product, category, and user-related actions.

- **validators**  
  Validation schemas using Joi for validating incoming data (e.g., product details, category information).

### 2. **config**
Contains general configuration settings used throughout the project (e.g., MongoDB URI, JWT secrets, SendGrid API keys).

### 3. **helpers**
Shared logic for utility functions that are reused throughout the app (e.g., email formatting, data manipulation).

### 4. **loaders**
Contains essential application files, including Express setup, Mongoose configuration, Passport.js for authentication, and logger setup.

### 5. **models**
Contains MongoDB schema models for collections such as users, products, and categories.

- **Product Model:** Defines product schema for storing product details.
- **Category Model:** Defines schema for product categories.

### 6. **services**
Contains business logic for interacting with the models. For example, services for creating, updating, deleting, and retrieving products and categories from the database.

### 7. **app.js**
Main entry point for the application. Sets up middleware, routes, and starts the Express server on the configured port.

---

## Features

### **Authentication**

- **User Registration & Login**  
  - `POST /register`: Register a new user.
  - `POST /login`: Login a user and generate a JWT token for authentication.
  - `POST /forgot-password`: Send a password reset email.
  - `POST /reset-password`: Reset user password.
  - `GET /user-profile`: Get the logged-in user's profile.
  - `PUT /user-profile`: Update the logged-in user's profile.

### **Product Management**

- **CRUD Operations for Products**  
  - `GET /products`: Fetch a list of all products.
  - `GET /product/:id`: Fetch a specific product by ID.
  - `POST /product`: Create a new product.
  - `PUT /product/:id`: Update an existing product by ID.
  - `DELETE /product/:id`: Delete a product by ID.

### **Category Management**

- **CRUD Operations for Categories**  
  - `GET /categories`: Fetch a list of all product categories.
  - `GET /category/:id`: Fetch a specific category by ID.
  - `POST /category`: Create a new category.
  - `PUT /category/:id`: Update an existing category by ID.
  - `DELETE /category/:id`: Delete a category by ID.

### **SendGrid Integration**
  - Sends transactional emails such as registration confirmation, password reset emails, and more using SendGrid.

---

## Build and Run Docker Containers:

docker-compose up --build


## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/kalpesh05/store-assignment-




## 🔄 Trade-offs & Considerations

This project balances simplicity, scalability, and testability. Below are key decisions and their trade-offs.

### ✅ Assumptions

- MongoDB is used as the primary database, accessed via **Mongoose ODM**.
- JWT-based authentication system for secure access.
- Validation handled via **Joi** schemas.
- API documentation implemented using **Swagger (OpenAPI)**.
- Tests are written using **Jest** and **Supertest**, assuming a real MongoDB instance.
- Authentication managed via **Passport.js** with JWT strategy.
- `.populate()` is used via **Mongoose Populate** for linked data like product → category.

---

### ⚖️ Design Trade-offs

| Decision                              | Benefit                                               | Trade-off                                              |
|---------------------------------------|--------------------------------------------------------|---------------------------------------------------------|
| Centralized Dynamic Route Registration | Scalable & concise codebase                           | Harder to trace for newcomers                           |
| Custom Middleware (Validation/Auth)   | Modular & reusable                                    | Adds initial setup complexity                          |
| Mongoose `.populate()` for references | Easier to fetch nested data                           | Can affect performance with large or deep queries       |
| Swagger in Route File                 | Keeps docs close to code                              | Adds noise to routing logic                             |
| Manual Error Messages in Joi          | Clear and reusable messages                           | Needs syncing if schema changes                         |
| Single `.env` for config              | Simplicity in setup                                   | Needs separation for staging/production environments    |

---

### 📌 Considerations for Production

- Add **rate limiting** and **security middleware** like `helmet`.
- Replace JWT secrets with environment-managed secrets (e.g., AWS Secrets Manager).
- Add **logging** and **monitoring** tools (Winston, Sentry, etc.).
- Separate **test** and **production** MongoDB URIs to avoid accidental data loss.
- Use **CI/CD pipelines** to automate tests, lint checks, and deployments.

