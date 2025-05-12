# Online Store

Skeleton for an Express-based online store app, using MongoDB for data storage and basic authentication functionality.  
* Includes SendGrid integration for transactional emails such as registration and password reset.

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




refrence branch: https://github.com/kalpesh05/oneStepAway