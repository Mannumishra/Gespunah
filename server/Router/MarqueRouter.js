const { createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord } = require("../Controllar/MarqueControllar")

const marqueRouter = require("express").Router()

marqueRouter.post("/marquee" ,createRecord)
marqueRouter.get("/marquee" ,getRecord)
marqueRouter.get("/marquee/:_id" ,getSingleRecord)
marqueRouter.put("/marquee/:_id" ,updateRecord)
marqueRouter.delete("/marquee/:_id" ,deleteRecord)

module.exports = marqueRouter