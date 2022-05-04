const express = require("express");
const router = express.Router();

const { OrdersAction } = require("./orders");
const { OrderAction } = require("./order");
const { UpdateOrderAction } = require("./update-order")

// Returns all orders
router.post("/", OrdersAction);

// Update order
router.post("/:id/update", UpdateOrderAction);

// Return concrete order by /:id
router.post("/:id", OrderAction);

module.exports = router;