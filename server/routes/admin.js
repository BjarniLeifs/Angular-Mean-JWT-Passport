// Each file has it's own scope there for basic stuff is needed
// Using express
var express = require('express');
// Making router
var router = express.Router();

// Connecting db
var mongoose = require('mongoose');

// Activating Users schem and getting to it.
var User = mongoose.model('User');

// Connecting to helpers for returning permissions.
var open4 = require('../helpers/scopes');


/**********     USER's     **********/

// Get all the users
router.get('/api/admin/allUsers', open4.Scopes(['admin']), 
  	function (req, res) {
    	User.find({}, 
    		function (err, users) {
  				if (err) {
  					return next(err);
				}
				res.json(users);
			}
		);
  	}
);

// Get the user by username
router.get('/api/admin/userByUsername', open4.Scopes(['admin']), 
  	function (req, res) {
    	User.find({ username: req.username }, 
    		function (err, user) {
  				if (err) {
  					return next(err);
  				}
  				res.json(user);
				// object of the user
  				console.log(user);
			}
		);
  	}
);


// Get a user with ID of 1

router.get('/api/admin/UserByUserId', open4.Scopes(['admin']),
	function (req, res) {
		User.findById(req.id, function (err, user) {
			if (err) {
				return next(err);
			}
		 	res.json(user);
		 	console.log(user);
		});
  }
);


// Find 


/*

// find the user starlord55
// update him to starlord 88
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});

// find the user with id 4
// update username to starlord 88
User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});

// get the user starlord55
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });
});

// find the user with id 4
User.findOneAndRemove({ username: 'starlord55' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});

// find the user with id 4
User.findByIdAndRemove(4, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
*/
/*                                              *
 *                  Something                   *
 *                                              */


// Returning calls to whom ever called. 
module.exports = router;