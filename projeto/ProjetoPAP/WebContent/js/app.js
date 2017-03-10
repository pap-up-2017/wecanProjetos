angular.module('app', ['ui.router']);

angular.module('app').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
  var estado = {
		  name: 'pageEstado',
		  url: '/pageEstado',
		  templateUrl: 'views/cadEstado.html'
  		}
  
  var cidade = {
		  name: 'pageCidade',
		  url: '/pageCidade',
		  templateUrl: 'views/cadCidade.html'
		}
  
  var instituicao = {
		  name: 'pageInstituicao',
		  url: '/pageInstituicao',
		  templateUrl: 'views/cadInstituicao.html'
		}
  
  var projeto = {
		  name: 'pageProjeto',
		  url: '/pageProjeto',
		  templateUrl: 'views/cadProjeto.html'
		}
  
  var curso = {
		  name: 'pageCurso',
		  url: '/pageCurso',
		  templateUrl: 'views/cadCurso.html'
		}
  
  var competencia = {
		  name: 'pageCompetencia',
		  url: '/pageCompetencia',
		  templateUrl: 'views/cadCompetencia.html'
		}
  
  var tipoUsuario = {
		  name: 'pageTipoUsuario',
		  url: '/pageTipoUsuario',
		  templateUrl: 'views/cadTipoUsuario.html'
		}
  
  var usuario = {
		  name: 'pageUsuario',
		  url: '/pageUsuario',
		  templateUrl: 'views/cadUsuario.html'
		}
  
  var disciplina = {
		  name: 'pageDisciplina',
		  url: '/pageDisciplina',
		  templateUrl: 'views/cadDisciplina.html'
		}
  
  var home = {
		  name: 'pageHome',
		  url: '/',
		  template: '<h1>Bem vindo!</h1>'
		}
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider.state(home);
  $stateProvider.state(estado);
  $stateProvider.state(cidade);
  $stateProvider.state(instituicao);
  $stateProvider.state(projeto);
  $stateProvider.state(curso);
  $stateProvider.state(competencia);
  $stateProvider.state(tipoUsuario);
  $stateProvider.state(usuario);
  $stateProvider.state(disciplina);
  
});

/*angular.module("app", [ "ngRoute" ]);

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

*/