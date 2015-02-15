
//Define angular app
var app = angular.module('app', ['templatescache', 'ngRoute', 'ngAnimate', 'wu.masonry', 'angular-images-loaded', 'ngTouch'])

//configure application routes, 
//note: this is using gulp-angular-template-cache so only template names are needed
app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				redirectTo: '/projects'
				// templateUrl: 'home.html',
				// controller: 'main-controller'
			})

			.when('/projects', {
				templateUrl: 'projects.html',
				controller: 'main-controller'
			})

			.when('/project/:id', {
				templateUrl: 'project-template.html',
				controller: 'project-controller'
			})

			.when('/project', {
				redirectTo: '/projects'
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

app.controller('project-controller', function($scope, $routeParams, $sce){
	$scope.projects = projects;
	for(x in $scope.projects){
		if($scope.projects[x].link === $routeParams.id){
			$scope.projectLoaded = $scope.projects[x];
		}
	};

	$scope.toTrusted = function(html){
		return $sce.trustAsHtml(html);
	}

	$scope.currentIndex = 0;
	$scope.images = $scope.projectLoaded.images;
	
	$scope.setCurrentIndex = function(index){
		$scope.currentIndex = index;
	};

	$scope.isCurrentIndex = function(index){
		return $scope.currentIndex === index;
	};

	$scope.showNext = function(){
		$scope.currentIndex = ($scope.currentIndex < $scope.images.length - 1) ? ++$scope.currentIndex : 0;
	};
	$scope.showPrevious = function(){
		$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.images.length -1;
	};


})
