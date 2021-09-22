const mongoose = require("mongoose");
const  postsSchema = require("./postSchema");

const User = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type:String ,
        required: true
    },
    password : {
        type:String ,
        required: true
    },
    profile : {
        type:String ,
        required: false
    },
    posts: postsSchema
}
)

const userCollection = mongoose.model("User",User)
module.exports = userCollection;