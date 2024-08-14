const { createCategory, getCategory, getSingleCategory, deleteCategory, updateCategory } = require("../Controllar/CategoryControllar")
const upload = require("../Middleware/multer")
// const { verifyAdmin } = require("../Utils/Verifytoken")

const categoryRouter = require("express").Router()

categoryRouter.post("/category", upload.single("categoryimage"), createCategory)
categoryRouter.get("/category", getCategory)
categoryRouter.get("/category/:_id", getSingleCategory)
categoryRouter.delete("/category/:_id", deleteCategory)
categoryRouter.put("/category/:_id",upload.single("categoryimage") , updateCategory)

module.exports = categoryRouter