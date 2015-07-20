/* MainController */

app.controller('MainController', ['$scope', 'posts', 'auth', 
    function ($scope, posts, auth) {
        $scope.currentPost = {};

        $scope.isLoggedIn = auth.isLoggedIn;

        $scope.getPosts = function () {
            return posts.posts;
        };

        $scope.getPost = function (id) {
            return posts.getPost(id);
        };

        $scope.addPost = function () {
            if (!$scope.currentPost.title || $scope.currentPost.title === '') {
                return;
            }
            $scope.currentPost.upvotes = 0;
            posts.addPost($scope.currentPost);
            $scope.currentPost = {};
        };

        $scope.incrementUpvote = function (post) {
            posts.incrementUpvote(post);
        };
    }
]);
