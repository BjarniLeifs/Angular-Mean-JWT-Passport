// Declaring modul passport.
var passport = require('passport');

// Declaring local strategy model, meaning local authantication. 
var LocalStrategy = require('passport-local').Strategy;

// Declare of other strategy model like facebook, twitter, google and more needs
// To be same as above with local stragegy model. See passportjs API and documentations.

// Declaring mongodb/mongoose database.
var mongoose = require('mongoose');

// Declaring User schem found in models. search, use, set new user and so forth.
var User = mongoose.model('User');

// Telling passport to use LocalStrategy, it then checks if everything is okei.
// If not it throws error message back if valid it returns user logged in.
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));