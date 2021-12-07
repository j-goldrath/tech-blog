const router = require('express').Router();
const { Comment, User, Post } = require('../models');

//GET request to find all posts
router.get('/', (req, res) => {
  Post.findAll({ include: [User] })
    .then(post => {

      const posts = post.map((user) => user.get({ plain: true }));

      res.render('all-posts', { posts });
    })
    .catch(err => {
      res.send(err);
    });
});

// GET request to find specific post by id
router.get('/:id', (req, res) => {
  Post.findByPk(req.params.id, { include: [User, { model: Comment, include: [User] }] })
    .then(post => {

      const posts = post.get({ plain: true });
      res.render('single-post', { posts });
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
