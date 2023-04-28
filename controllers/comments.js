const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      await comment.save();
      const [post] = await Promise.all([
        Post.findById(req.params.postId),
      ]);
      post.comments.unshift(comment);
      await post.save();
      res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  });

  //Updoot
  app.put('/comments/:id/vote-up', async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment.upVotes.includes(req.user._id)) {
        if (comment.downVotes.includes(req.user._id)) {
          comment.downVotes.pop(req.user._id)
          comment.voteScore += 1;
        } else {
          comment.upVotes.push(req.user._id);
          comment.voteScore += 1;
        };
      };
      await comment.save();
      return res.status(200);
    } catch (err) {
      console.log(err);
    }
  });

  //Downdoot
  app.put('/comments/:id/vote-down', async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);  
      if (!comment.downVotes.includes(req.user._id)) {
        if (comment.upVotes.includes(req.user._id)) {
          comment.upVotes.pop(req.user._id)
          comment.voteScore -= 1;
        } else {
          comment.downVotes.push(req.user._id);
          comment.voteScore -= 1;
        }
      };
      await comment.save();
      return res.status(200);
    } catch (err) {
      console.log(err);
    }
  });
};