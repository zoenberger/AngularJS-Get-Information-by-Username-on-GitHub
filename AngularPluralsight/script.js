// Code goes here

var app = angular.module('githubViewer', []);

app.controller('MainController', function ($scope, $http) {

    var onError = function (reason) {
        $scope.error = "Could not fetch tcolefromportlandhe user";
    };


    $scope.search = function (username) {
        $http.get("https://api.github.com/users/" + username)
      .then(function (response) {
          $scope.user = response.data;
          $http.get($scope.user.repos_url)
                .then(onRepos, onError);
      }, onError);
    };

    var onRepos = function(response){
        $scope.repos = response.data;
    };

    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";

});