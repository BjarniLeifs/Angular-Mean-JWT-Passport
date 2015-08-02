// Each file has it's own scope there for basic stuff is needed
// Using express
var express = require('express');

// Making router
var router = express.Router();

// Declare model for use. mongodb (database) 
var mongoose = require('mongoose');

// Declare jwt (json web tokens) model for auth for tokens
var jwt = require('express-jwt');

// Declare auth for authorataion of use. to call for some function
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

// Declare Post and Comment Schem, it is needed so it is posible to make new, 
// Posts, comments and search in database...
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Information about what is posible to use.
// get , post, pull, del, etc...
// req = request, res = response, next = used if making middleware or jump out of 
// The current function, otherwise it might be infinite loop and server will never
// Stop in that particular function, unless timedout or stoped in someway...
// Please google for more information about render, send, json and other things
// That is possible to use this is API of express. 


// Geting all posts, Post.find = look in Post part of database and find posts.
router.get('/posts', function (req, res, next) {

    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }
        res.json(posts);
    });
});

// Making new post and save it to database, auth is used, you need to be logged in
router.post('/posts', auth, function (req, res, next) {
    var post = new Post(req.body);
    post.author = req.payload.username;

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

// Getting posts post, meaning comments in it... and other information
router.get('/posts/:post', function (req, res, next) {
    req.post.populate('comments', function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(req.post);
    });
});

// Posts posts upvote is for voting for a post.. auth is used. Need to be logged in.
router.put('/posts/:post/upvote', auth, function (req, res, next) {
    req.post.upvote(function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

// Making comment under specific post, auth is used. Need to be logged in.
router.post('/posts/:post/comments', auth, function (req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function (err, comment) {
        if (err) {
            return next(err);
        }
        req.post.comments.push(comment);
        req.post.save(function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(comment);
        });
    });
});

// Vote on comment, auth used. Need to be logged in.
router.put('/posts/:post/comments/:comment/upvote', auth, function(req, res, next) {
    req.comment.upvoteToto(function(err, comment) {
        if (err) {
            return next(err);
        }
        res.json(comment);
    });
});

// Looking for post if not found prompt error that post cant be found.
router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error("Can't find post !"));
        }

        req.post = post;
        return next();
    });
});

// Looking for comment if not found prompt error that comment cant be found.
router.param('comment', function (res, req, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if (err) {
            return next(err);
        }
        if (!comment) {
            return next(new Error("Can't find comment !"));
        }

        req.comment = comment;
        return next();
    });
});

// Returning calls to whom ever called. 
module.exports = router;

