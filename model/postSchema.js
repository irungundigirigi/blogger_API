const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postsSchema = new Schema ({
    post_image: {imageUrl: String},
    title: String, //This is a shorthand for {type: String}
    body: String,
    date: Date,
    tags:[String],
    likes: [{
        by:String,
        date:Date
    }],

    comments: [{
        by: String,
        body: String,
        date: Date
    }]


})
module.exports = postsSchema;