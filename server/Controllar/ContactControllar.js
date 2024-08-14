const contact = require("../Model/ContactModel")

const createRecord = async (req, res) => {
    try {
        let { name, email, phone, message } = req.body
        console.log(req.body)
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: true,
                mess: "Fill all Required fileds"
            })
        }
        let data = new contact({ name, email, phone, message })
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Record Created",
            data: data
        })
    } catch (error) {
        if (error.keyValue.email) {
            res.status(400).json({
                success: false,
                mess: "This Email Id is Already Register with us "
            })
        }
        else if (error.keyValue.phone) {
            res.status(400).json({
                success: false,
                mess: "This contact Number is Already Register with us "
            })
        }
        else {
            res.status(500).json({
                success: false,
                mess: "Internal Server Error"
            })
        }
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await contact.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await contact.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record Deleted"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                mess: "Record Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord: deleteRecord
}