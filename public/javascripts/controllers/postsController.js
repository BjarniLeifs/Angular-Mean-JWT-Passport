/* PostsController */

app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth',
    function ($scope, posts, post, auth) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.post = post;

        $scope.addComment = function () {
            if($scope.body === '') { return; }
            posts.addComment(post._id, {
                body: $scope.body,
                author: 'user',
            }).success(function (comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };

        $scope.incrementUpvotes = function (comment) {
            posts.upvoteComment(post, comment);
        };

}]);