const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { db } = require('../../models/Post');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');
const { MongoClient, ObjectID } = require('mongodb'); 

router.get("/test", (req, res) => res.json({ msg: "Posts route test" }));

router.post('/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            event_id: req.body.event_id,
            user_id: req.user.id,
            text: req.body.text,
        });

        newPost.save().then(post => res.json(post));
    }
);

router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ notpostsfound: 'No posts found' }));
});


router.delete('/delete/:id', 
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        await db.collection('posts').deleteOne({ _id: ObjectID(req.params.id) });
        res.json('deleted');
});

module.exports = router;