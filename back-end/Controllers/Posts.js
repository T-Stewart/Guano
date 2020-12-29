const Post = require('../Models/Post')

var PostsController = {
  Index: function(req, res) {
    Post.find( function(err, posts) {
      if (err) { throw err; }
        posts = posts.reverse()
        res.json(posts)

      });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/api/posts')
    });
  },

  Delete: function(req, res){
    var id = req.body.id;
    Post.deleteOne({"_id" : id}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/api/posts')
    });
  },

  Update: function(req, res){
    console.log("in delete function")
    var id = req.body.id
    var thought = req.body.thought
    var opinion = req.body.opinion
    var comments = req.body.comments

    Post.updateOne({"_id" : id}, {$set: {"thought": thought, "opinion": opinion , "comments": comments}}, {upsert: true}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/api/posts')
    })
  },

  findOne: function(req, res){
    console.log("in the retrieve function")
    var id = req.body.id
    Post.findOne({"_id" : id}, function(err, posts){
      if(err) { throw err; }

      res.json(posts);
    })
  },

  UpdateForm: function(req, res) {
    res.render('/update', {});
  }
};

module.exports = PostsController;