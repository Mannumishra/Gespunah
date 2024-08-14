const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email id is must Required"],
        unique:true
    }
})

const newletter = new mongoose.model("newsletter" , newsletterSchema)

module.exports = newletter