const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order");

router.get("/orders", OrderController.index);
router.post("/orders", OrderController.create);

module.exports = router;