// Each file has it's own scope there for basic stuff is needed
// Using express
var express = require('express');
// Making router
var router = express.Router();
// Information about what is posible to use.
// get , post, pull, del, etc...
// req = request, res = response, next = used if making middleware or jump out of 
// The current function, otherwise it might be infinite loop and server will never
// Stop in that particular function, unless timedout or stoped in someway...
// Please google for more information about render, send, json and other things
// That is possible to use this is API of express. 

/*
  1. Remember to declare models of use. database, shcems and other needed
  2. Declare the variable that is used.. schem. 
    like so fx :  var Post = mongoose.model('Post');
  3. Code functions needed for the frontend to use... 
  4. Have fun ;)
*/

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}),
  	function (req, res) {
  		
  	}
  
);

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
	session: false,
  successRedirect : '/',
  failureRedirect : '/login'
}));


// Returning calls to whom ever called. 
module.exports = router;


