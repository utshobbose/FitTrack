const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/AuthMiddleware');
const { createOrder, getOrders, getOrderById, deleteOrder } = require("../controllers/OrderController");

// Apply authentication middleware to all routes
// router.use(authenticate);

// Create a new order
// router.post("/", authenticate, createOrder);
router.post('/', createOrder);
// Get all orders for the authenticated user
// router.get("/",authenticate, getOrders);
router.get("/", getOrders);

// Get a specific order by ID
// router.get("/:id", authenticate, getOrderById);
router.get("/:id", getOrderById);

// Delete an order by ID
// router.delete("/:id", authenticate, deleteOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
