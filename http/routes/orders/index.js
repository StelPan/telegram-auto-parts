const express = require("express");
const router = express.Router();

const { OrdersAction } = require("./orders");
const { OrderAction } = require("./order");

// Returns all orders
router.post("/", OrdersAction);

// Return concrete order by /:id
router.post("/:id", OrderAction);

module.exports = router;