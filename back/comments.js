const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    recipe: {
      type: mongoose.Schema.ObjectId,
      ref: 'Recipe',
    },
    
    comment: String,
    created: {
      type: Date,
      default: Date.now
    }
});
  
const Comment = mongoose.model('Comment', commentSchema);

// upload a comment
router.post("/:id", validUser, async (req, res) => {
    let comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        recipe: req.params.id,
    });
    console.log(req.body.comment);
    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
  
// get all comments
router.get("/:id", async (req, res) => {
    try {
        let comment = await Comment.find({
        recipe: req.params.id,
        }).populate('user');
        return res.send(comment);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}
  