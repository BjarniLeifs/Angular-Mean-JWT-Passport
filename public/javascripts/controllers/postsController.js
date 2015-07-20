/* PostsController */

app.controller('PostsController', ['$scope', 'posts', 'post', 'auth', 
    function ($scope, posts, post, auth) {
    $scope.post = post;
    $scope.comment = {};

    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.addComment = function () {
        if ($scope.comment.body === '') {
            return;
        }
        if (!$scope.comment.upvotes) {
            $scope.comment.upvotes = 0;
        }
        if (!$scope.comment.author) {
            $scope.comment.author = 'Anonymous';
        }
        posts.addComment(post, $scope.comment);
        $scope.comment = {};
    };

    $scope.incrementUpvotes = function (comment) {
        posts.incrementUpvoteComment($scope.post, comment);
    };
}]);