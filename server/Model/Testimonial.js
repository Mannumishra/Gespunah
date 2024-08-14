const mongoose = require("mongoose")

const testmialschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must Required"]
    },
    message: {
        type: String,
        required: [true, "Message Is Must Required"]
    },
    image: {
        type: String,
        required: [true, "Image is must required"]
    }
})

const testimonial = mongoose.model("Testimonial", testmialschema)

module.exports = testimonial