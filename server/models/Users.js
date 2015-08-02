// Declare of mongodb/mongoose database model.
var mongoose = require('mongoose');

// Declare of crypto model, it is for salt and hasing information. Security model.
var crypto = require('crypto');

// Declare of jwt (Json web token), used for client and server for authanticating user 
// This is done for security feature.. other method that can be used = sessions.
var jwt = require('jsonwebtoken');

// Making the Schema for User and adding to database.. this is like table in sql.. 
// Welcome to "schemless" database coding.. we are using jsons here.
var UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        lowercase: true, 
        unique: true
    },
    hash: String,
    salt: String
});

// Method function to set password. Crypto used for security 
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString();
};

// Method function to validate password. 
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString();
    return hash === this.hash;
};

// Method function to generate json web token for user.. exp = expire, returns token with
// ID, USERNAME AND WHEN IT EXPIRE's
UserSchema.methods.generateJWT = function() {
    // Set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
            _id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000)
        },
        'SECRET');
};

// Simular to table, this identity name of the "table". This is how we know where to 
// PUT or GET things from right schems
mongoose.model('User', UserSchema);



