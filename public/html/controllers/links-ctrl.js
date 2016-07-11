angular.module('myLinks', ['ngRoute', 'ngAnimate'])

.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: 'TechCtrl',
    templateUrl: 'html/links.html'
  })
  .otherwise('/');
})

.factory('rightWay', [ function(){
	var o = {
		toggleSidebar: function() {
            $("#wrapper").toggleClass("toggled");
		}
	};
	return o;
}])


.controller('TechCtrl', ['$scope', '$http', 'rightWay',
			function($scope, $http, rightWay) {


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
$scope.displayVids = function(code) {
	var div = document.getElementById("youtube");
	div.innerHTML = "\n\t\t<iframe width=\"80%\" height=\"70%\"\n\t\tsrc=\"http://www.youtube.com/embed/" + code + "?autoplay=1\">\n\t\t</iframe>";
    rightWay.toggleSidebar();
};

}])

.run(function ($templateCache){
 $templateCache.put('html/links.html');
});
