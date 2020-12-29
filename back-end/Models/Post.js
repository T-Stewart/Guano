const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    thought: Object,
    opinion: String,
    comments: Object,
    userId: String,
    userName: String
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post;