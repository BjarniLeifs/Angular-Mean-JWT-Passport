/* PostsFactory */

app.factory('posts', ['$http', 'auth', function ($http, auth) {
    // service body
    var object = {
        posts: []
    };

    object.getAll = function () {
        return $http.get('/posts').success(function (data) {
            angular.copy(data, object.posts);
        });
    };

    object.create = function (post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function (data) {
            object.posts.push(data);
        });
    };

    object.upvote = function (post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
        .success(function (data) {
            post.upvotes += 1;
        });
    };

    object.get = function (id) {
        return $http.get('/posts/' + id).then(function (res) {
            return res.data;
        });
    };

    object.addComment = function (id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };

    object.upvoteComment = function (post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
        .success(function (data) {
            comment.upvotes += 1;
        });
    };

    return object;
}])