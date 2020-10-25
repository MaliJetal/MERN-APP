const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Model
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../validation/post');

router.get('/test', (req, res) => res.json({ msg: "Post works" }));

//@route  GET api/posts
//@desc   Get Post
//@access Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json('No post found'));
});

//@route  GET api/posts/:id
//@desc   Get Post by id
//@access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json('No post found with that id'));
});

//@route  POST api/posts
//@desc   Create Post
//@access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    res.status(404).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

//@route  POST api/posts/like/:id
//@desc   Like Post
//@access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post' });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
});

//@route  POST api/posts/unlike/:id
//@desc   DisLike Post
//@access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notlike: 'You have not like this post' });
          }
          const reomveIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(reomveIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
});

//@route  POST api/posts/comment/:id
//@desc   Add comment to Post
//@access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    res.status(404).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);
      post.save().then(res.json(post));
    })
    .catch(err => res.status(400).json({ postnotfound: 'No post found' }));

});

//@route  POST api/posts/comment/:id/:comment_id
//@desc   Remove comment from post
//@access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      //Check to see if comment exist

      if (
        post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({commentnotexist : 'Comment does not exist'});
      }

      //Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);
 
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch (err => res.status(400).json({ postnotfound: 'No post found' }));

});

//@route  DELETE api/posts
//@desc   Delete Post
//@access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuthorised: 'User not authorised' });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ UserNotFound: 'Post not found' }));
    })
})


module.exports = router;
