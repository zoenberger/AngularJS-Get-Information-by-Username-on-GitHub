// Code goes here

var app = angular.module('githubViewer', []);

app.controller('MainController', function ($scope, github, $interval, $log, $anchorScroll, $location) {

    var onError = function (reason) {
        $scope.error = "Could not fetch the user";
    };


    $scope.search = function (username) {
        $log.info("Searching for " + username);
        github.getUser(username).then(onUserComplete, onError);
        if (countdownInterval) {
            $interval.cancel(countdownInterval);
            $scope.countdown = null;
        };
    };

    var onUserComplete = function(data) {
        $scope.user = data;
        github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function(data) {
        $scope.repos = data;
        $location.hash("userDetails");
        $anchorScroll();
    };


    var decrementCountdown = function () {
        $scope.countdown -= 1;
        if($scope.countdown <1) {
            $scope.search($scope.username);
        };
    }
    var countdownInterval = null;

    var startCountdown = function () {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown)
    };

    $scope.username = "Angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    startCountdown();
});