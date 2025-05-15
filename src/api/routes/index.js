const express = require("express");
const router = express.Router();
const passport = require("passport");
const controller = require("../controllers");
const { apiAuth, validation } = require("../middlewares");

// Routes list
const routes = [
  //Auth
  {
    method: "POST",
    path: "/register",
    handler: "AuthController.register",
    swagger: {
      summary: "Register a new user",
      description: "Registers a new user and returns the user information.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "User successfully registered"
        },
        400: {
          description: "Invalid input"
        }
      }
    }
  },
  {
    method: "POST",
    path: "/login",
    handler: "AuthController.login",
    swagger: {
      summary: "Login a user",
      description: "Logs in a user and returns an authentication token.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Successfully logged in, token returned"
        },
        401: {
          description: "Invalid credentials"
        }
      }
    }
  },
  {
    method: "POST",
    path: "/forgot-password",
    handler: "AuthController.forgotPassword",
    swagger: {
      summary: "Forgot password",
      description: "Initiates the password reset process by sending a reset link to the user's email.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Reset password email sent"
        },
        400: {
          description: "Invalid email format"
        }
      }
    }
  },
  {
    method: "POST",
    path: "/reset-password",
    handler: "AuthController.resetPassword",
    swagger: {
      summary: "Reset password",
      description: "Resets the user's password.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
                newPassword: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Password successfully reset"
        },
        400: {
          description: "Invalid token or password"
        }
      }
    }
  },
  {
    method: "GET",
    path: "/user-profile",
    handler: "AuthController.getMyDetail",
    authenticate: true,
    swagger: {
      summary: "Get user profile",
      description: "Retrieves the details of the authenticated user.",
      responses: {
        200: {
          description: "User profile details retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" }
                }
              }
            }
          }
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/user-profile",
    handler: "UserController.updateProfile",
    authenticate: true,
    swagger: {
      summary: "Update user profile",
      description: "Updates the profile information of the authenticated user.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "User profile successfully updated"
        },
        400: {
          description: "Invalid data"
        }
      }
    }
  },
  {
    method: "GET",
    path: "/logout",
    handler: "AuthController.logout",
    authenticate: true,
    swagger: {
      summary: "Logout the user",
      description: "Logs out the current authenticated user.",
      responses: {
        200: {
          description: "User logged out successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  },
  {
    method: "GET",
    path: "/user-verify-email",
    handler: "AuthController.verifyEmail",
    swagger: {
      summary: "Verify user email",
      description: "Verifies the user's email address.",
      responses: {
        200: {
          description: "Email successfully verified"
        },
        400: {
          description: "Invalid verification token"
        }
      }
    }
  },
  // Product routes
  {
    method: "GET",
    path: "/products",
    handler: "ProductController.getAll",
    authenticate: true,
    swagger: {
      summary: "Get all products",
      description: "Retrieve a list of all products.",
      responses: {
        200: {
          description: "A list of products",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                    stock: { type: "number" }
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  },
  {
    method: "GET",
    path: "/products/:product_id",
    handler: "ProductController.getOne",
    authenticate: true,
    swagger: {
      summary: "Get a product by ID",
      description: "Retrieves a product by its ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Product found" },
        404: { description: "Product not found" }
      }
    }
  },
  {
    method: "POST",
    path: "/products",
    handler: "ProductController.create",
    authenticate: true,
    swagger: {
      summary: "Create a new product",
      description: "Creates a new product with the given information.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                stock: { type: "number" }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: "Product successfully created"
        },
        400: {
          description: "Invalid input"
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/products/:product_id",
    handler: "ProductController.update",
    authenticate: true,
    swagger: {
      summary: "Update product",
      description: "Updates a product by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                stock: { type: "number" }
              }
            }
          }
        }
      },
      responses: {
        200: { description: "Product updated successfully" },
        400: { description: "Invalid input" }
      }
    }
  },
  {
    method: "DELETE",
    path: "/products/:product_id",
    handler: "ProductController.delete",
    authenticate: true,
    swagger: {
      summary: "Delete product",
      description: "Deletes a product by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Product deleted successfully" },
        404: { description: "Product not found" }
      }
    }
  },

  // Category routes (if not already added)
  {
    method: "GET",
    path: "/categories",
    handler: "CategoryController.getAll",
    authenticate: true,
    swagger: {
      summary: "List all categories",
      description: "Retrieves all categories.",
      responses: {
        200: {
          description: "List of categories",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    method: "GET",
    path: "/categories/:category_id",
    handler: "CategoryController.getOne",
    authenticate: true,
    swagger: {
      summary: "Get a category by ID",
      description: "Retrieves a category by its ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Category found" },
        404: { description: "Category not found" }
      }
    }
  },
  {
    method: "POST",
    path: "/categories",
    handler: "CategoryController.create",
    authenticate: true,
    swagger: {
      summary: "Create category",
      description: "Creates a new category.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        201: { description: "Category created successfully" },
        400: { description: "Invalid input" }
      }
    }
  },
  {
    method: "PUT",
    path: "/categories/:category_id",
    handler: "CategoryController.update",
    authenticate: true,
    swagger: {
      summary: "Update category",
      description: "Updates a category by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" }
              }
            }
          }
        }
      },
      responses: {
        200: { description: "Category updated successfully" },
        400: { description: "Invalid input" }
      }
    }
  },
  {
    method: "DELETE",
    path: "/categories/:category_id",
    handler: "CategoryController.delete",
    authenticate: true,
    swagger: {
      summary: "Delete category",
      description: "Deletes a category by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        200: { description: "Category deleted successfully" },
        404: { description: "Category not found" }
      }
    }
  }
];

// Applying routes
routes.forEach(route => {
  const handler = route.handler.split(".");

  let middleware = [(req, res, next) => next()];
  let validationMiddlware = (req, res, next) => {
    validation.validate(req.body, handler);
    next();
  };

  if (route.authenticate) {
    middleware.push(apiAuth);
    middleware.push(passport.authenticate("jwt", { session: false }));
  }

  // Validators
  if (!["get", "delete"].includes(route.method.toLowerCase())) {
    middleware.push(validationMiddlware);
  }

  router[route.method.toLowerCase()](
    route.path,
    ...middleware,
    controller[handler[0]][handler[1]]
  );
});

exports.router = router;
exports.routes = routes;
