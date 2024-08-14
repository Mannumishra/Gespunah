const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name Must Required"]
    },
    category: {
        type: String,
        required: [true, "Product Maincategory Must Required"]
    },
    collectionname: {
        type: String,
        required: [true, "Product subcategory Must Required"]
    },
    numberoffoot:{
        type:[String],
        required:[true , "Number of foot is most important"]
    },
    sizes: [
        {
            pair: {
                type: String,
                required: [true, "Product Size Must Required"]
            },
            price: {
                type: Number,
                required: [true, "Product Price Must Required"]
            },
            discountprice: {
                type: Number,
                required: [true, "Product Price Must Required"]
            },
            finalprice: {
                type: Number,
                required: [true, "Product Price Must Required"]
            }
        }
    ],
    productdetails: {
        type: String,
        required: [true, "Product Details is must Required"]
    },
    description: {
        type: String,
        default: ""
    }, tag: {
        type: String,
        required: [true, "Tag is true"]
    },
    stock: {
        type: String,
        default: 0
    },
    pic1: {
        type: String,
        default: ""
    },
    pic2: {
        type: String,
        default: ""
    },
    pic3: {
        type: String,
        default: ""
    },
    pic4: {
        type: String,
        default: ""
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
