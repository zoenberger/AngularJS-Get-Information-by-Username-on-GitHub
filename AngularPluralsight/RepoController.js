// Code goes here

var app = angular.module('githubViewer');

app.controller('RepoController', function ($scope, github, $log, $routeParams) {

    var repoDetail = function () {
        github.getRepoDetail($scope.username, $scope.reponame).then(onDetail, onError);
    };

    var onDetail = function (data) {
        $scope.repoinfo = data;
        github.getRepoContributors($scope.username, $scope.reponame).then(onContributors, onError);
    };

    var onContributors = function (data) {
        $scope.repocontributors = data;
    };

    var onError = function (reason) {
        $scope.error = "Could not fetch the user";
    };

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    repoDetail();

});