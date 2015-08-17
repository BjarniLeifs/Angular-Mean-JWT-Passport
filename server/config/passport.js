// Declaring modul passport.
var passport = require('passport');

// Declaring local strategy model, meaning local authantication. 
var LocalStrategy = require('passport-local').Strategy;

// Declaing facebook strategy model, meaning authantication with facebook
var FacebookStrategy = require('passport-facebook').Strategy;

// Declare of other strategy model like facebook, twitter, google and more needs
// To be same as above with local stragegy model. See passportjs API and documentations.

// Declaring mongodb/mongoose database.
var mongoose = require('mongoose');

// Declaring User schem found in models. search, use, set new user and so forth.
var User = mongoose.model('User');

// Getting configureation of socialnetworks informations.
var social = require('../config/socialNetworks');

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
            console.log(user);
            return done(null, user);
        });
    }
));


passport.use(new FacebookStrategy({
    // Configure app
        clientID: social.facebook.clientID,
        clientSecret: social.facebook.clientSecret,
        callbackURL: social.facebook.callbackURL,
        enableProof: false
    },
    function (token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();
                    
                    // set all of the facebook information in our user model
                    newUser.username = profile.displayName;
                    newUser.scopes.push('User');
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });
    }
));

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}






