const { ShipRocketLogin, MakeOrderReadyToShip } = require("../Controllar/shiprocket")

const shiprocket = require("express").Router()

shiprocket.post("/login-via-shiprocket", ShipRocketLogin)
shiprocket.post("/shiped-order-shiprocket", MakeOrderReadyToShip)



module.exports = shiprocket