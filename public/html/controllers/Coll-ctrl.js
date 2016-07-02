angular.module('myColl', ['ngRoute', 'myLinks', 'ngAnimate'])

.controller('CollCtrl', ['$scope', '$http',
			function($scope, $http) {

var updateColl = function() {
  $http.get('/dbColl').success(function(response) {
    console.log(response);
    $scope.dbColl = response;
	$scope.coll = "";
  });
};

updateColl();

$scope.addColl = function() {
  console.log($scope.coll);
  $http.post('/dbColl', $scope.coll).success(function(response) {
  	console.log(response);
	updateColl();
	});
};

$scope.delColl = function(id) {
  console.log(id);
  $http.delete('/dbColl/' + id).success(function(response) {
    updateColl();
  });
};

$scope.selectColl = function(id) {
  console.log(id);
  $http.get('/dbColl/' + id).success(function(response) {
    $scope.coll = response;
  });
};

}]);﻿
