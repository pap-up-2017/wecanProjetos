angular.module("app", [ "ngRoute" ]);

angular.module("app").config(function($routeProvider) {	
	$routeProvider
    .when("/cadEstado", {
        templateUrl : "views/cadEstado.html"
    });
});	