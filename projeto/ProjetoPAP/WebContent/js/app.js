angular.module("app", [ "ngRoute" ]);

angular.module("app").config(function($routeProvider) {	
	
	$routeProvider
    .when("/cadEstado", {
        templateUrl : "views/cadEstado.html"
    })
	
    .when("/cadCidade", {
        templateUrl : "views/cadCidade.html"
    })
	
    .when("/cadInstituicao", {
        templateUrl : "views/cadInstituicao.html"
    })
	
    .when("/cadProjeto", {
        templateUrl : "views/cadProjeto.html"
    })
	
    .when("/cadCurso", {
        templateUrl : "views/cadCurso.html"
    })
	
   .when("/cadCompetencia", {
        templateUrl : "views/cadCompetencia.html"
    })
    
    .when("/cadTipoUsuario", {
        templateUrl : "views/cadTipoUsuario.html"
    })
    
    .when("/cadUsuario", {
        templateUrl : "views/cadUsuario.html"
    })
	
    .when("/cadDisciplina", {
        templateUrl : "views/cadDisciplina.html"
    });
});	

