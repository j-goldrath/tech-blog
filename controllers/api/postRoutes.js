const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST request to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.json(newPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT request to update existing post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send(err);
    }

});

// DELETE request to delete existing post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.json(deletedPost);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;
