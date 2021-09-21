const express = require('express');
const bcrypt = require('bcrypt');
const userCollection = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { response } = require('express');
const router = express.Router();
const authorize = require('./authorize');
const upload = require('./profile_upload');





//Signup route
router.post("/signup", async (req,res) => {
    const {name,email,password} = req.body;

   try{
        userCollection.findOne({"email":email}, async (err,user) => {
            if(err) {
                res.json({"err":err})
            }else if(user){
                res.json({"message":"User already exists"})
            }else {
                const newUser = new userCollection(req.body)
                //Generate salt to hash the password
                const salt = await bcrypt.genSalt(10);
                //Set user password to the new password
                newUser.password = await bcrypt.hash(newUser.password,salt);
                await newUser.save()
                .then(res.json({"message":"User successfully registered!"}))
            }
        })
   }catch(err) {
       res.json({"err":err})
   }
})   


//Login route
router.post("/login", async (req,res) => {

    const{email,password} = req.body;
    const user = await userCollection.findOne({email:email});
    //to sign a token you need: 1.The secret 2.Piece of data to hash in the token 3. The token expire time
    const token =   jwt.sign({email:email}, process.env.TOKEN_SECRET);

    if(user) {
        const validPassword = await bcrypt.compare(password,user.password);
        if(validPassword){
                //send access token
                res.cookie('access_token', token,  {httpOnly : true});
                res.status(200).json({"message":"User verified successfully","token":token,"code":"S"})
        }else{
                res.status(200).json({"message":"Wrong password","code":"WP"})
        };
    }else{
                res.status(200).json({"message":"User not found","code":"UNF"})
    };
})
router.get('/test_authorize',authorize,(req,res) => {
 res.send('test_authorize path')
})

//upload profile piprofile-piccture
router.post("/upload-profile",upload.single('profile') , async(req,res) => {
   
    //const path = req.file.path.replace(/\\/g, "/")
    console.log(req.file.path)
    const path = `http:localhost:3002/${req.file.path}`
    res.send(path)
   

})
module.exports = router
