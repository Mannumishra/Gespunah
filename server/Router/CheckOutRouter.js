const { placeOrder, getUserRecord, getRecord, getSingleOrder, updateOrderRecord, paymentVerification } = require("../Controllar/CheckoutControllar")

const checkoutrouter = require("express").Router()

checkoutrouter.post("/checkout", placeOrder)
checkoutrouter.get("/checkout/:userid", getUserRecord)
checkoutrouter.post("/Payment-Verification", paymentVerification)
checkoutrouter.get("/checkout", getRecord)
checkoutrouter.get("/checkout/admin/:_id", getSingleOrder)
checkoutrouter.put("/checkout/admin/:_id", updateOrderRecord)

module.exports = checkoutrouter