// Each file has it's own scope there for basic stuff is needed
// Using express
var express = require('express');

// Making router
var router = express.Router();

// Declare model for use. mongodb (database) 
var mongoose = require('mongoose');

// Declare model for use. Passport (Authentication)
var passport = require('passport');

// Information about what is posible to use.
// get , post, pull, del, etc...
// req = request, res = response, next = used if making middleware or jump out of 
// The current function, otherwise it might be infinite loop and server will never
// Stop in that particular function, unless timedout or stoped in someway...
// Please google for more information about render, send, json and other things
// That is possible to use this is API of express. 

// Declare User Schem, it is needed so it is posible to make new, 
// For add or search in database...
var User = mongoose.model('User');

// Making request to register.. checks if username and password is not empty
router.post('/register', function (req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    user.username = req.body.username;
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        // Returns token and generate it from User schem.
        return res.json({token: user.generateJWT()});
    });


});

// Checks if username and password is not empty.
router.post('/login', function (req, res, next) {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    // Authenticating user with passport
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
        	// If correct generate token from User schem.
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

// Returning calls to whom ever called. 
module.exports = router;


