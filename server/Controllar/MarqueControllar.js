const marque = require("../Model/Marque")

const createRecord = async (req, res) => {
    try {
        const { text } = req.body
        if (!text) {
            return res.status(400).json({
                success: false,
                mess: "Required all fileds"
            })
        }
        const data = new marque({ text })
        await data.save()
        res.status(200).json({
            success: true,
            mess: "Record Created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async(req,res)=>{
    try {
        let data = await marque.find()
        if(data){
            res.status(200).json({
                success:true,
                mess:"Record found",
                data:data
            })
        }
        else{
           return res.status(400).json({
                success:false,
                mess:"Record Not found"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}

const getSingleRecord = async(req,res)=>{
    try {
        let data = await marque.findOne({_id:req.params._id})
        if(data){
            res.status(200).json({
                success:true,
                mess:"Record found",
                data:data
            })
        }
        else{
           return res.status(400).json({
                success:false,
                mess:"Record Not found"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}

const updateRecord = async(req,res)=>{
    try {
        let data = await marque.findOne({_id:req.params._id})
        if(data){
            data.text=req.body.text??data.text
            await data.save()
            res.status(200).json({
                success:true,
                mess:"Record Updated successfully",
                data:data
            })
        }
        else{
           return res.status(400).json({
                success:false,
                mess:"Record Not found"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}

const deleteRecord = async(req,res)=>{
    try {
        let data = await marque.findOne({_id:req.params._id})
        if(data){
           await data.deleteOne()
            res.status(200).json({
                success:true,
                mess:"Record Deleted",
                data:data
            })
        }
        else{
           return res.status(400).json({
                success:false,
                mess:"Record Not found"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            mess:"Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord:getRecord,
    getSingleRecord:getSingleRecord,
    updateRecord:updateRecord,
    deleteRecord:deleteRecord
}