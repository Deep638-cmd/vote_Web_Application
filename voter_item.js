const express=require("express");
const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const schema=new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true,
        min: 18,
        max: 60
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
    },
    address:{
        type: String,
        require: true
    },
    pincode:{
        type: Number,
        require: true
    },
    password:{
        type: String,
    require: true
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    complete:{
        type: Boolean,
       
        default: false

    },
    hasvoted:{
        type: Boolean,
        default: false
    },
    votedAt:{
        type: Date
    }
});
schema.pre("save",async function(next){
    
     if(!this.isModified("password")){
   next();
  }
  try{
    const deep=this;
    const salt=await bcrypt.genSalt(12);
    const hashedpassword=await bcrypt.hash(deep.password,salt);
    deep.password=hashedpassword;
    next();
  }catch(err){
    console.log("errror");
    next(err);
  }

})
schema.methods.comparepassword=async function (currentpassword){
    const deep=this;
const compare=await bcrypt.compare(currentpassword,deep.password);
return compare;
}
const app=mongoose.model("app",schema);
module.exports=app;