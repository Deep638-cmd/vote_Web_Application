const express=require("express");
const app=express();
const mongodb=require("./mongodb");
require('dotenv').config();
const r = require("./voter_router");
app.use(express.json());
app.use("/voter",r);

app.listen(3000,()=>{
    console.log(`serven is connecting on 3000 port`);
})