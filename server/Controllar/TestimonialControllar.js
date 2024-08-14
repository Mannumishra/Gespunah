const testimonial = require("../Model/Testimonial")
const fs = require("fs")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dglihfwse',
    api_key: '939345957566958',
    api_secret: 'q-Pg0dyWquxjatuRb62-PtFzkM0'
});
const uploadCloundanary = async (file) => {
    try {
        const uploadFile = await cloudinary.uploader.upload(file)
        return uploadFile.secure_url
    } catch (error) {
        console.log(error)
    }
}

const createRecord = async (req, res) => {
    try {
        let { name, message } = req.body
        if (!name || !message) {
            res.status(400).json({
                success: false,
                mess: "Please Fill All Fields"
            })
        }
        else {
            let data = new testimonial({ name, message })
            if (req.file) {
                const url = await uploadCloundanary(req.file.path)
                data.image = url
                await data.save()
                res.status(200).json({
                    success: true,
                    mess: "Record Created",
                    data: data
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await testimonial.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await testimonial.findOne({_id:req.params._id})
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        const { _id } = req.params
        let data = await testimonial.findById(_id)
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record Deleted"
            })
        }
        else {
            res.status(400).json({
                success: false,
                mess: "Record Not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await testimonial.findOne({ _id: req.params._id })
        if (data) {
            console.log(data)
            data.name = req.body.name ?? data.name
            data.message = req.body.message ?? data.message
            if (req.file) {
                console.log(req.file)
                try {
                    fs.unlinkSync(data.image)
                } catch (error) { }
                const url = await uploadCloundanary(req.file.path)
                data.image = url
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Record Updated successfully",
                data:data
            })
        }
        else {
            res.status(401).json({
                success: false,
                mess: "Record not found for update"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    deleteRecord: deleteRecord,
    updateRecord: updateRecord,
    getSingleRecord:getSingleRecord
}