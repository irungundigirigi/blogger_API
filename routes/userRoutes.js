const express = require('express');
const userCollection = require("../model/userModel");
const router = express.Router();



router.post("/signup", async (req,res) => {
    const {name,email,password} = req.body;

    //Mongoose find
   try{
        userCollection.findOne({"email":email}, async (err,user) => {
            if(err) {
                res.json({"err":err})
            }else if(user){
                res.json({"message":"User already exists"})
            }else {
                const newUser = new userCollection(req.body)
                await newUser.save()
                .then(res.json({"message":"User successfully registered!"}))
            }
        })
   }catch(err) {
       res.json({"err":err})
   }
})   
    
module.exports = router
