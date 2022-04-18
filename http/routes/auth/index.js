const express = require("express");
const router = express.Router();

const { LoginAction } = require("./login");
const { LogoutAction } = require("./logout");
const { ClientInfoAction } = require("./client-info");

// Login client end-point
router.post("/login", LoginAction);

// Logout client end-point
router.post("/logout", LogoutAction);

router.post("/client-info", ClientInfoAction);

module.exports = router;

