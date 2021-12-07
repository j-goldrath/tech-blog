const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// POST request to create a new comment
router.post('/createComment', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create(req.body, req.session.user_id);
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating comment');
    }
});

module.exports = router;