const { addItemToCart, getCart, removeItemFromCart, updateCartItemQuantity } = require("../Controllar/CartControllar")

const cartRouter = require("express").Router()

cartRouter.post("/cart", addItemToCart)
cartRouter.get("/cart/:userid", getCart)
cartRouter.delete("/cart/:_id", removeItemFromCart)
cartRouter.put("/cart/:_id", updateCartItemQuantity)

module.exports = cartRouter