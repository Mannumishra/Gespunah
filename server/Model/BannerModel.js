const mongoose = require("mongoose")

const banareSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image Field is must Required"]
    }
})

const banare = mongoose.model("Banare" , banareSchema)

module.exports = banare