/* PostsFactory */

app.factory('posts', ['$http', 'auth', 
    function ($http, auth) {
        var service = {
            posts: []
        };

        service.getAll = function () {
            return $http.get('/posts')
                .success(function (data) {
                    angular.copy(data, service.posts);
                });
        };

        service.getPost = function (id) {
            return $http.get('/posts/' + id)
                .then(function (res) {
                    return res.data;
                });
        };

        service.addPost = function (post) {
            return $http.post('/posts', post, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                service.posts.push(data);
            });
        };

        service.incrementUpvote = function (post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                post.upvotes += 1;
            });
        };

        service.addComment = function (post, comment) {
            return $http.post('/posts/' + post._id + '/comments', comment, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                post.comments.push(data);
            });
        };

        service.incrementUpvoteComment = function (post, comment) {
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                comment.upvotes += 1;
            })
                .error(function (err) {
                    window.alert(err);
                });
        };

        return service;
    }
]);