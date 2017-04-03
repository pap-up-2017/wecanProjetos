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
  
  var tarefa = {
		  name: 'pageTarefa',
		  url: '/pageTarefa',
		  templateUrl: 'views/cadTarefa.html'
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
  
  var cadastrosAdmin = {
		  name: 'cadastrosAdmin',
		  url: '/cadAdmin',
		  templateUrl: 'views/cadastrosAdmin.html'
		}
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider.state(home);
  $stateProvider.state(estado);
  $stateProvider.state(cidade);
  $stateProvider.state(instituicao);
  $stateProvider.state(projeto);
  $stateProvider.state(tarefa);
  $stateProvider.state(curso);
  $stateProvider.state(competencia);
  $stateProvider.state(tipoUsuario);
  $stateProvider.state(usuario);
  $stateProvider.state(disciplina);
  $stateProvider.state(cadastrosAdmin);
});