// Declare of mongodb/mongoose database model.
var mongoose = require('mongoose');

// Making the Schema for Posts and adding to database.. this is like table in sql.. 
// Welcome to "schemless" database coding.. we are using jsons here.
var PostSchema = mongoose.Schema({
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

// Method function to vote on posts
PostSchema.methods.upvote = function (cb) {
    this.upvotes += 1;
    this.save(cb);
};

// Simular to table, this identity name of the "table". This is how we know where to 
// PUT or GET things from right schems
mongoose.model('Post', PostSchema);