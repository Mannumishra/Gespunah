const mongoose = require("mongoose")

const contactuSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is must Required"]
    },
    email: {
        type: String,
        require: [true, "Email is must Required"],
        unique: true
    },
    phone: {
        type: Number,
        require: [true, "Phone is must Required"],
        unique: true
    },
    message: {
        type: String,
        require: [true, "Message is must Required"]
    }
}, { timestamps: true })

const contact = mongoose.model("contact", contactuSchema)

module.exports = contact