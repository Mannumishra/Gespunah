const { uploadCloundanary } = require("../Middleware/cloudnary");
const Product = require("../Model/ProductModel")
const fs = require("fs")

const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { name, category, sizes, description, tag, productdetails, collectionname, stock, numberoffoot } = req.body;
        const data = new Product({ name, category, sizes, description, tag, productdetails, collectionname, stock, numberoffoot })
        if (req.files.pic1) {
            const url = await uploadCloundanary(req.files.pic1[0].path)
            data.pic1 = url
        }
        if (req.files.pic2) {
            const url = await uploadCloundanary(req.files.pic2[0].path)
            data.pic2 = url
        }
        if (req.files.pic3) {
            const url = await uploadCloundanary(req.files.pic3[0].path)
            data.pic3 = url
        }
        if (req.files.pic4) {
            const url = await uploadCloundanary(req.files.pic4[0].path)
            data.pic4 = url
        }
        await data.save();
        try {
            fs.unlinkSync(req.files.pic1[0].path)
        } catch (error) { }
        try {
            fs.unlinkSync(req.files.pic2[0].path)
        } catch (error) { }
        try {
            fs.unlinkSync(req.files.pic3[0].path)
        } catch (error) { }
        try {
            fs.unlinkSync(req.files.pic4[0].path)
        } catch (error) { }
        res.status(200).json({
            success: true,
            mess: "Product created",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const data = await Product.find();
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Product Found Successfully",
                data: data
            });
        }
        else {
            res.status(400).json({
                success: true,
                mess: "Product Not Found Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id });
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Product Found",
                data: data
            });
        } else {
            res.status(404).json({
                success: true,
                mess: "Product Not found",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.category = req.body.category ?? data.category
            data.collectionname = req.body.collectionname ?? data.collectionname
            data.description = req.body.description ?? data.description
            data.productdetails = req.body.productdetails ?? data.productdetails
            data.tag = req.body.tag ?? data.tag
            data.sizes = req.body.sizes ?? data.sizes
            data.stock = req.body.stock ?? data.stock
            data.numberoffoot = req.body.numberoffoot ?? data.numberoffoot
            if (req.files.pic1) {
                const url = await uploadCloundanary(req.files.pic1[0].path)
                data.pic1 = url
            }
            if (req.files.pic2) {
                const url = await uploadCloundanary(req.files.pic2[0].path)
                data.pic2 = url
            }
            if (req.files.pic3) {
                const url = await uploadCloundanary(req.files.pic3[0].path)
                data.pic3 = url
            }
            if (req.files.pic4) {
                const url = await uploadCloundanary(req.files.pic4[0].path)
                data.pic4 = url
            }
            await data.save()
            try {
                fs.unlinkSync(req.files.pic1[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.pic2[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.pic3[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.pic4[0].path)
            } catch (error) { }
            res.status(200).json({
                success: true,
                mess: "Product Updated Successfully",
                data: data
            });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Product Deleted Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createProduct: createProduct,
    getAllProducts: getAllProducts,
    deleteProduct: deleteProduct,
    getProductById: getProductById,
    updateProduct: updateProduct
}