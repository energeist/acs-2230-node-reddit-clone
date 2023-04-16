const Post = require('../models/post');

module.exports = (app) => {

  // Index posts
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  })

  // New post
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  })

  // Create a post
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    // console.log(post)
    post.save()
      .then(() => {
        res.redirect('/')
      })
      .catch(err => console.log(err))
  });

  // Show a post with :id
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean()
      return res.render('posts-show', { post });
    } catch(err) {
      console.log(err.message);
    }   
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    console.log(req.params.subreddit)
    try {
      let posts = await Post.find({ subreddit: req.params.subreddit }).lean()
      console.log(posts)
      return res.render('posts-index', { posts });
    } catch(err) {
      console.log(err.message);
    }
    // Post.find({ subreddit: req.params.subreddit }).lean()
    // .then((posts) => res.render('posts-index', { posts }))
    // .catch((err) => {
    //   console.log(err);
    // })
  });
}; //This close bracket is for the module.exports above and should always be last line