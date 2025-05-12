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
    handler: "AuthController.register"
  },
  {
    method: "POST",
    path: "/login",
    handler: "AuthController.login"
  },
  {
    method: "POST",
    path: "/forgot-password",
    handler: "AuthController.forgotPassword"
  },
  {
    method: "POST",
    path: "/reset-password",
    handler: "AuthController.resetPassword"
  },
  {
    method: "GET",
    path: "/user-profile",
    handler: "AuthController.getMyDetail",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/user-profile",
    handler: "UserController.updateProfile",
    authenticate: true
  },
  {
    method: "GET",
    path: "/logout",
    handler: "AuthController.logout",
    authenticate: true
  },
  {
    method: "GET",
    path: "/user-verify-email",
    handler: "AuthController.verifyEmail"
  },
  // Product routes
  {
    method: "GET",
    path: "/products",
    handler: "ProductController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/products/:product_id",
    handler: "ProductController.getOne",
    authenticate: true
  },
  {
    method: "POST",
    path: "/products",
    handler: "ProductController.create",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/products/:product_id",
    handler: "ProductController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/products/:product_id",
    handler: "ProductController.delete",
    authenticate: true
  },

  // Category routes (if not already added)
  {
    method: "GET",
    path: "/categories",
    handler: "CategoryController.getAll",
    authenticate: true
  },
  {
    method: "GET",
    path: "/categories/:category_id",
    handler: "CategoryController.getOne",
    authenticate: true
  },
  {
    method: "POST",
    path: "/categories",
    handler: "CategoryController.create",
    authenticate: true
  },
  {
    method: "PUT",
    path: "/categories/:category_id",
    handler: "CategoryController.update",
    authenticate: true
  },
  {
    method: "DELETE",
    path: "/categories/:category_id",
    handler: "CategoryController.delete",
    authenticate: true
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
