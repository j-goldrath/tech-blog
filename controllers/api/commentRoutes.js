const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// POST request to create a new comment
router.post('/:post_id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            body: req.body.body,
            post_id: req.params.post_id,
            user_id: req.session.user_id
        });
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating comment');
    }
});

module.exports = router;