angular.module("app").controller('HomePageCtrl', function($scope, $http, $cookies, $cookieStore, $rootScope) {
	
	$scope.carregarPaginaRegister = function(){
		window.location.href = $rootScope.pattern_url+"register.html";
	}
	
	$scope.carregarPaginaHome = function(){
		window.location.href = $rootScope.pattern_url+"home.html";
	}
});