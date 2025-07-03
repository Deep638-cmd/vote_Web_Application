const mongoose=require('mongoose');
const url="mongodb://localhost:27017/Vote";
const url2= "mongodb+srv://Deep:<Deep123>@cluster0.lvenv.mongodb.net/"
mongoose.connect(url,{
//      useNewurlParseer:true,
// useUnifieldTopology: true
})

const db=mongoose.connection;
db.on("connected",()=>{
console.log("Connected with Database");
})
db.on("disconnected",()=>{
    console.log("DisConnected with Database");
    })
    db.on("error",(err)=>{
        console.log("Error with Database"+err);
        })
        
        // Exports the Dataabse base connection in server
       // module.exports=person;
        module.exports=db;//