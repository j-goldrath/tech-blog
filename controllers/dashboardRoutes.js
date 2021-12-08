const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            // order: [['title', 'ASC']],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new-post', withAuth, async (req, res) => {
    try {
        res.render('new-post', {
            layout: 'dashboard'
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id }
        });

        if (post) {
            const postData = post.get({ plain: true });
            res.render('edit-post', {
                postData,
            });

        } else {
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;