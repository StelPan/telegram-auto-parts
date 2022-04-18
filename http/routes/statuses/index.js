const express = require('express');
const router = express.Router();

const { StatusesAction } = require("./statuses");
const { CreateOrderStatusAction } = require("./create-status");
const { EditOrderStatusAction } = require("./edit-status");
const { OrderStatusAction } = require("./status");

// Return all statuses format json
router.post("/", StatusesAction);

// Create status end-point
router.post("/create", CreateOrderStatusAction);

// Update status by /:id
router.post("/:id/edit", EditOrderStatusAction);

// Find status by /:id
router.post("/:id", OrderStatusAction);

module.exports = router;
