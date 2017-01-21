var app = angular.module("app", [ "ngRoute" ]);
console.log("routeProvider");
app.config(function($routeProvider) {
	
	$routeProvider
    .when("/cadEstado", {
        templateUrl : "cadEstado.html"
    })
    .when("/", {
        templateUrl : "home.html"
    });
});