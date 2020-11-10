const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    thought: Object,
    opinion: String,
    comments: Object
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post;