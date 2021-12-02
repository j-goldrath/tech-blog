const router = require('express').Router();
const { User } = require('../models');

//get requests
// findallpostsbyuser

// findByPK


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup
//just like above do res.render on the signup page
module.exports = router;
