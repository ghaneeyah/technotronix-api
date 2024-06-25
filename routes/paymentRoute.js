const express = require("express")
const paymentController = require("../controllers/paymentController")
const {auth} = require("../middleware/auth")

const router = express.Router()
router.post("/api/payment/initiate", auth, paymentController.initiatePayment)
router.post("/api/payment/verify", auth, paymentController.verifyPayment)

module.exports = router