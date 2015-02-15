
//Define angular app
var app = angular.module('app', ['templatescache', 'ngRoute', 'ngAnimate', 'wu.masonry', 'angular-images-loaded'])

//configure application routes, 
//note: this is using gulp-angular-template-cache so only template names are needed
app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				templateUrl: 'home.html',
				controller: 'main-controller'
			})

			.when('/view1', {
				templateUrl: 'view1.html',
				controller: 'main-controller'
			})

			.when('/view2', {
				templateUrl: 'view2.html',
				controller: 'main-controller'
			})

			.when('/view3/:id', {
				templateUrl: 'view3.html',
				controller: 'view3-controller'
			})

			.when('/view3', {
				templateUrl: 'view3.html',
				controller: 'view3-controller'
			})

			.otherwise({
				redirectTo: '/#/'
			});

		$locationProvider.html5Mode(false);
}])

//The main controller
app.controller('main-controller', function($scope, $window, $timeout, $rootScope){
	$scope.projects = projects;
	
	/* Reloads masonry after window resize
	delayed to use CSS animation
	calls passy's reload() directive using rootScope*/
	$scope.reloadMasonry = function() {  //calls the function
		$timeout(function () {
			$rootScope.$broadcast('masonry.reload');
		}, 600);
	}		

	//detect when images are still loading
	$scope.imagesAreLoaded = false;
	$scope.imgLoadedEvents = {
				always: function(instance) {
						// Do stuff
				},

				done: function(instance) {
						$scope.imagesAreLoaded = true;
				},

				fail: function(instance) {
						// Do stuff
				}

		}

});

app.controller('view3-controller', function($scope, $routeParams){
	$scope.routeId = $routeParams.id;
})
