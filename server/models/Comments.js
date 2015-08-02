// Declare of mongodb/mongoose database model.
var mongoose = require('mongoose');

// Making the Schema for Comments and adding to database.. this is like table in sql.. 
// Welcome to "schemless" database coding.. we are using jsons here.
var CommentSchema = mongoose.Schema({
    author: String,
    body: String,
    upvotes: {type: Number, default: 0},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

// Method function to vote on comments
CommentSchema.methods.upvoteToto = function(cb) {
    this.upvotes +=1;
    this.save(cb);
};

// Simular to table, this identity name of the "table". This is how we know where to 
// PUT or GET things from right schems
mongoose.model('Comment', CommentSchema);