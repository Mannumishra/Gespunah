const { createRecord, getRecord, deleteRecord, updateRecord, getSingleRecord } = require("../Controllar/TestimonialControllar")
const multer = require("multer")
const testimonialRouter = require("express").Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/Testimonial')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

testimonialRouter.post("/testimonial", upload.single("image"), createRecord)
testimonialRouter.get("/testimonial", getRecord)
testimonialRouter.get("/testimonial/:_id", getSingleRecord)
testimonialRouter.delete("/testimonial/:_id", deleteRecord)
testimonialRouter.put("/testimonial/:_id", upload.single("image"), updateRecord)

module.exports = testimonialRouter