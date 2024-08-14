const mongoose = require("mongoose")

const marqueSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true,"Field is must required"]
    }
})

const marque = mongoose.model("Marque" , marqueSchema)

module.exports = marque