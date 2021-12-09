const router = require('express').Router();
const { Comment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

//GET request to find all posts by user
router.get('/', (req, res) => {
  Post.findAll({ include: [User] })
    .then(postData => {

      const posts = postData.map((post) => post.get({ plain: true }));
////changed all-posts to homepage
      res.render('homepage', { 
        posts,
        logged_in: req.session.logged_in
       });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET request to find specific post by id
// router.get('/posts/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       attributes: ['id', 'title', 'content', 'created_at'],
//       include: [
//         {
//           model: User,
//           attributes: ['displayName'],
//         },
//         {
//           model: Comment,
//           attributes: ['id', 'body', 'created_at', 'user_id', 'post_id'],
//           include: {
//             model: User,
//             attributes: ['displayName'],
//           },
//         },
//       ],
//     });

//     if (postData) {
//       const post = postData.get({ plain: true });
//       console.log(post.comments);

//       res.render('single-post', {
//         posts,
//         logged_in: req.session.logged_in,
//         displayName: req.session.displayName
//       });
//     } else {
//       res.status(404).json({ message: 'No post by that id exists!' });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET request to find specific post by id
router.get('/posts/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, { include: [User, { model: Comment, include: [User] }] })
    .then(post => {

      const posts = post.get({ plain: true });
      console.log(posts);
      res.render('single-post', { posts });
    })
    .catch(err => {
      res.send(err);
    });
});

// GET request to render view for adding comment to post with specific post_id
router.get('/comments/:post_id', withAuth, (req, res) => {
  Post.findByPk(req.params.post_id, { include: [User, { model: Comment, include: [User] }] })
  .then(post => {

    const posts = post.get({ plain: true });
    console.log(posts);
    res.render('add-comments', { posts });
  })
  .catch(err => {
    res.send(err);
  });
});

// GET request to login user
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET request for new user signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
