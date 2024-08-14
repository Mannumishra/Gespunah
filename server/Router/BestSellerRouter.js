const bestsellerRouter = require("express").Router()
const { createRecord, getRecord, updateRecord, deleteRecord, getSingleRecord } = require("../Controllar/BestSellerControllar")
const upload = require("../Middleware/multer")

bestsellerRouter.post("/bestseller", upload.single("image"), createRecord)
bestsellerRouter.get("/bestseller", getRecord)
bestsellerRouter.get("/bestseller/:_id", getSingleRecord)
bestsellerRouter.put("/bestseller/:_id", upload.single("image"), updateRecord)
bestsellerRouter.delete("/bestseller/:_id",deleteRecord)

module.exports = bestsellerRouter

