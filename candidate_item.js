const mongoose=require("mongoose");
const schema=new mongoose.Schema({
name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true,
        min: 25,
        max:70
     
    },
    aadhar:{
        type: Number,
        require: true,
        unique: true
    },
    role:{
        type: String,
        enum:["voter","candidate"],
        require: true
    }



})
const app=mongoose.model("app",schema);
module.exports=app;