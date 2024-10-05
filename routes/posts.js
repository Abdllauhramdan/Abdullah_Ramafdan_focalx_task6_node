const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load posts from data.json
let posts = require('../data.json');

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

// Create a new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        date: new Date().toISOString(),
    };
    posts.push(newPost);
    fs.writeFileSync('data.json', JSON.stringify(posts, null, 2));
    res.status(201).json(newPost);
});

// Update a post
router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex !== -1) {
        const updatedPost = {
            ...posts[postIndex],
            ...req.body,
        };
        posts[postIndex] = updatedPost;
        fs.writeFileSync('data.json', JSON.stringify(posts, null, 2));
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Delete a post
router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const newPosts = posts.filter(p => p.id !== postId);

    if (newPosts.length !== posts.length) {
        posts = newPosts;
        fs.writeFileSync('data.json', JSON.stringify(posts, null, 2));
        res.status(200).json({ message: 'Post deleted' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

module.exports = router;
