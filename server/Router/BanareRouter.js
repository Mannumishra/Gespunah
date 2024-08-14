const banareRouter = require("express").Router()
const { createRecord, getRecord, updateRecord, deleteRecord, getSingleRecord } = require("../Controllar/BanareControllar")
const upload = require("../Middleware/multer")

banareRouter.post("/banare", upload.single("image"), createRecord)
banareRouter.get("/banare", getRecord)
banareRouter.get("/banare/:_id", getSingleRecord)
banareRouter.put("/banare/:_id", upload.single("image"), updateRecord)
banareRouter.delete("/banare/:_id",deleteRecord)

module.exports = banareRouter

