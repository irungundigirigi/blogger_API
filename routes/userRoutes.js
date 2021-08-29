const express = require('express');
const userModel = require("../model/userModel");
const router = express.Router();



router.post("/", async (req,res) => {
    const users = userModel.find()
    //const newUser =  new userModel(req.body)
        try {
           // await newUser.save()
            //res.status(200).json({"message":"user saved", "users":users})
            console.log(users)
        } catch (error) {
            res.status(500).json({"message":"user  was not -saved"})
        }
})



module.exports = router;
