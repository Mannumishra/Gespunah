const { createRecord, login, forgetPassword1, forgetPassword2, forgetPassword3, getSingleRecord, updateRecord, getRecord } = require("../Controllar/UserControllar")
const multer = require("multer")
const userRouter = require("express").Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/Images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

userRouter.post("/user", createRecord)
userRouter.get("/user/:_id", getSingleRecord)
userRouter.get("/user", getRecord)
userRouter.put("/user/:_id", upload.single("pic"), updateRecord)
userRouter.post("/user/login", login)
userRouter.post("/user/forgetpassword1", forgetPassword1)
userRouter.post("/user/forgetpassword2", forgetPassword2)
userRouter.post("/user/forgetpassword3", forgetPassword3)

module.exports = userRouter