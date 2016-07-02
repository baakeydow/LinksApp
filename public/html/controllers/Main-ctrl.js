angular.module('mainCtrl', ['myLinks', 'myColl', 'ngRoute', 'ngAnimate'])

.controller('MainCtrl', ['$scope',
			function($scope) {

$scope.templates =
  [ { name: 'Collections', url: 'html/coll.html'},
    { name: 'Bookmarks', url: 'html/Bookmarks.html'} ];
$scope.template = $scope.templates[0];

}]);﻿
