const express=require('express');
//const app=express();

const router=express.Router();//
const {middlejwt, generateToken}=require("./authentication");

const menu=require("./voter_item");
router.post('/signup',async(req, res) => {
    try{
        const data=req.body;
        //console.log(data)
    const newmenu=new menu(data);// Assign all data in newperson variable
   const response=await newmenu.save();
   
   
 
   
        console.log("Data Saved successsfully");
 res.status(200).json({response: response});
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:"Internetserver error"});
   }
    
   })
//Login Route
router.post("/login",async(req,res)=>{
    try{
        //extract Username and password from request server
        const{aadhar,password}=req.body;
        const user=await menu.findOne({aadhar: aadhar});
        if(!user || !(await user.comparepassword(password))){
            return res.status(401).json({error: "Invalid username or password"});
        }
//Generate Token
  const token = generateToken({ 
            id: user._id.toString()
             // Include role in token if needed
        });

console.log("Token is: "+token);
res.json({token})


    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internet issue"});
    }
})



router.get('/',middlejwt,async(req,res)=>{
try{
    let newmenu=menu;
    const data=await newmenu.find();
    console.log("Data fected suceessfully");
   
    res.status(200).json(data);
 


}
catch(err){
    console.log(err);
res.status(500).json({error:"Internetserver error"});
}
})

router.post("/vote",middlejwt,async(req,res)=>{
    try{
         const userid  = req.user.id; // Changed from aadhar to _id
        console.log(userid);
        // 2. Find user by _id (not aadhar)
        const user = await menu.findById(userid);
        if(!user){
            console.log("Please fill the login and signup at 1st");
            res.status(401).json({error: "Plaese fill the login & signup form"});
        }
        if(user.hasvoted){
            res.status(200).json("Voter has already complete his voting");
        }
        if(user.role!=="voter"){
            res.status(401).json({error: "Voter is not eligible for voting"});
        }
        user.hasvoted=true;
        user.complete=true;
        user.votedAt = new Date();
        await user.save();
        res.status(200).json("Now, voter is done his vote");
    }
    catch(err){
        console.log(err);
         res.status(500).json({error: "Internet issue"});
    }
})//


router.put("/changepassword", middlejwt, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await menu.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!(await user.comparepassword(currentPassword))) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        
        if (currentPassword === newPassword) {
            return res.status(400).json({ 
                error: "New password must be different from current password" 
            });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.error("Password change error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
module.exports=router;