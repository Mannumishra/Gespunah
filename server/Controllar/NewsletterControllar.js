const newsletter = require("../Model/NewsletterModel")

const createRecord = async (req, res) => {
    try {
        let { email } = req.body
        if (!email) {
            return res.status(401).json({
                success: false,
                mess: "Fill all fiels"
            })
        }
        let data = new newsletter({ email })
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Record created",
            data: data
        })
    } catch (error) {
        if (error.keyValue.email) {
            res.status(400).json({
                success: false,
                mess: "This Email id is already with us"
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
        let data = await newsletter.find()
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
        let data = await newsletter.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record Deleted"
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