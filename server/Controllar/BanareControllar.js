const { uploadCloundanary } = require("../Middleware/cloudnary");
const banare = require("../Model/BannerModel");
const fs = require("fs")

const createRecord = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                mess: "No file uploaded"
            });
        }
        const data = new banare(req.file);
        if (req.file) {
            const url = await uploadCloundanary(req.file.path)
            data.image = url
        }
        await data.save();
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) {}
        res.status(200).json({
            success: true,
            mess: "Banare Uploaded Successfully",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        });
    }
};

const getRecord = async (req, res) => {
    try {
        let data = await banare.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banare found Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "Banare not found Successfully",
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
        let data = await banare.findOne({_id:req.params._id})
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banare found Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "Banare not found Successfully",
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
        const data = await banare.findOne({ _id: req.params._id })
        if (data) {
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
                mess: "Banare Updated Successfully",
                data: data
            });
        }
        else {
            res.status(401).json({
                success: false,
                mess: "Banare not updated ",
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
        const data = await banare.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Banare Deleted Successfully"
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
    getSingleRecord:getSingleRecord
}
