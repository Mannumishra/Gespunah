const mongoose = require("mongoose")

const sellerSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image Field is must Required"]
    },
    traindingName:{
        type:String,
        required:[true,"Image Field is must Required"]
    }
})

const bestseller = mongoose.model("Bestseller" , sellerSchema)

module.exports = bestseller