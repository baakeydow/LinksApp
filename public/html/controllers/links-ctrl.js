angular.module('myLinks', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: 'TechCtrl',
    templateUrl: 'html/links.html'
  })
  .otherwise('/');
})

.controller('TechCtrl', ['$scope', '$http',
			function($scope, $http) {


var refresh = function() {
  $http.get('/techLinks').success(function(response) {
	console.log(response);
	$scope.techLinks = response;
	$scope.tech = "";
  });
};

refresh();

$scope.firedata = refresh;

$scope.addLinks = function() {
  console.log($scope.tech);
  if ($scope.tech.desc && $scope.tech.name) {
	  $http.post('/techLinks/', $scope.tech).success(function(response) {
      	console.log(response);
  		refresh();
    	});
  } else {
	  alert('nope');
  }
};
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/techLinks/' + id).success(function(response) {
    refresh();
  });
};
$scope.edit = function(id) {
  console.log(id);
  $http.get('/techLinks/' + id).success(function(response) {
    $scope.tech = response;
  });
};
$scope.update = function() {
  console.log($scope.tech._id);
  $http.put('/techLinks/' + $scope.tech._id, $scope.tech).success(function(response) {
    refresh();
  })
};
$scope.deselect = function() {
  $scope.tech = "";
}
}])

.run(function ($templateCache){
 $templateCache.put('html/links.html');
});
