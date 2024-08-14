const mongoose = require("mongoose")

const getConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        // await mongoose.connect("mongodb://localhost:27017/newsocks")
        console.log("database connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

getConnect()