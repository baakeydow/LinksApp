angular.module('mainCtrl', ['myLinks', 'myColl','myContact', 'ngRoute', 'ngAnimate'])

.controller('MainCtrl', ['$scope',
			function($scope) {

$scope.templates =
	[ { name: 'Collections', url: 'html/coll.html'},
	{ name: 'Bookmarks', url: 'html/Bookmarks.html'},
	{ name: 'Contact', url: 'html/Contact.html'} ];
$scope.template = $scope.templates[0];

}]);﻿
