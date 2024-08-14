const { uploadCloundanary } = require("../Middleware/cloudnary");
const bestseller = require("../Model/BestSellerModel");
const fs = require("fs")

const createRecord = async (req, res) => {
    try {
        const data = new bestseller(req.body)
        if (req.file) {
            const url = await uploadCloundanary(req.file.path)
            data.image = url
        }
        await data.save();
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }
        res.status(200).json({
            success: true,
            mess: "bestseller Record Created Successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await bestseller.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "bestseller found Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "bestseller not found Successfully",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await bestseller.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "bestseller found Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "bestseller not found Successfully",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const updateRecord = async (req, res) => {
    try {
        const data = await bestseller.findOne({ _id: req.params._id })
        if (data) {
            data.traindingName = req.body.traindingName ?? data.traindingName
            if (!req.file) {
                res.status(400).json({
                    success: false,
                    mess: "No file uploaded"
                });
            }
            else if (req.file) {
                const url = await uploadCloundanary(req.file.path)
                data.image = url
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
            res.status(200).json({
                success: true,
                mess: "bestseller Updated Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "bestseller not updated ",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

const deleteRecord = async (req, res) => {
    try {
        const data = await bestseller.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "bestseller Deleted Successfully"
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "Record Not Found"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getSingleRecord: getSingleRecord
}
