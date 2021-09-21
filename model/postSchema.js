const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postsSchema = new Schema ({
    post_image: {imageUrl: String},
    postTitle: String,
    postBody: String,
    posted_on: Date,
    tags:[String],
    likes: [{
        likedBy:String,
        likedOn:Date
    }],

    comments: [{
        commentedBy: String,
        commentBody: String,
        commentedOn: Date
    }]


})
module.exports = postsSchema;