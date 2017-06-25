angular.module('app', ['ngCookies'
                      ,'ui.router'])
                      .config(route).run(autentication).run(config);

function autentication($rootScope, $state, $location, $cookieStore){
    $rootScope.$on('$stateChangeStart',
    	    function(event, toState, toParams, fromState, fromParams){
    			// verifica se não há usuarios, e se não tiver ele retorna para a home
    	       if($cookieStore.get("session_user_id") == null){
    	    	    //window.location.href = "http://wecanprojetos.com.br/home.html";
    	    	    window.location.href = $rootScope.pattern_url+"index.html";
    	        	//window.location.href = "http://env-6524972.jelasticlw.com.br/home.html";
    	        }
    	    });
}
function route($stateProvider, $urlRouterProvider, $locationProvider){
	  var projeto = {
			  name: 'pageProjeto',
			  url: '/pageProjeto',
			  templateUrl: 'views/cadProjeto.html'
			}
	  
	  var competencia = {
			  name: 'pageCompetencia',
			  url: '/pageCompetencia',
			  templateUrl: 'views/cadCompetencia.html'
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
	  
	  var avaliacao = {
			  name: 'pageAvaliacao',
			  url: '/pageAvaliacao/{idDisciplina}',
			  templateUrl: 'views/cadAvaliacao.html'
			}
	  
	  var exercicio = {
			  name: 'pageExercicio',
			  url: '/pageExercicio/{idAvaliacao}',
			  templateUrl: 'views/cadExercicio.html'
			}
	  
	  var RespostaAvaliacao = {
			  name: 'pageRespostaAvaliacao',
			  url: '/pageRespostaAvaliacao/{idExercicio}',
			  templateUrl: 'views/cadRespostaAvaliacao.html'
			}	  
	  
	  
	  var home = {
			  name: 'pageHome',
			  url: '/',
			  templateUrl: 'views/dashboard.html'
			}
	  
	  var cadastrosAdmin = {
			  name: 'cadastrosAdmin',
			  url: '/cadAdmin',
			  templateUrl: 'views/cadastrosAdmin.html'
			}
	
	  var listaProjetos = {
			  name: 'pageListaProjetos',
			  url: '/pageListaProjetos',
			  templateUrl: 'views/listaProjetos.html'
			}
	  var meusProjetos = {
			  name: 'pageMeusProjetos',
			  url: '/pageMeusProjetos',
			  templateUrl: 'views/meusProjetos.html'
			}

	var alterarProjeto = {
			  name: 'pageAlterarProjeto',
			  url: '/pageAlterarProjeto/{idProjeto}',
			  templateUrl: 'views/altProjeto.html'
			}
	
	var detalhesProjeto = {
			  name: 'pageDetalhesProjeto',
			  url: '/pageDetalhesProjeto/{idProjeto}' ,
			  templateUrl: 'views/detalhesProjeto.html'
			}
	
	var feed = {
			  name: 'feed',
			  url: '/feed',
			  templateUrl: 'views/feed.html'
			}
	
	var perfil = {
			  name: 'perfil',
			  url: '/perfil/{idUsuario}',
			  templateUrl: 'views/perfil.html'
			}
	
	var altPerfil = {
			  name: 'altPerfil',
			  url: '/altPerfil',
			  templateUrl: 'views/altPerfil.html'
			}
	
	var listaNotificacoes = {
			  name: 'pageListaNotificacoes',
			  url: '/pageListaNotificacoes',
			  templateUrl: 'views/listaNotificacoes.html'
			}
	
	var listaAvaliacoes = {
			  name: 'pageListaAvaliacoes',
			  url: '/pageListaAvaliacoes/{idDisciplina}',
			  templateUrl: 'views/listaAvaliacoes.html'
			}
	var listaExercicios = {
			  name: 'pageListaExercicios',
			  url: '/pageListaExercicios/{idAvaliacao}',
			  templateUrl: 'views/listaExercicios.html'
			}
	var listaDisciplinas = {
		  name: 'pageListaDisciplinas',
		  url: '/pageListaDisciplinas',
		  templateUrl: 'views/listaDisciplinas.html'
		}
	  
	
	
	var listaProjetosConcluidos = {
			name: 'pageListaProjetosConcluidos',
			url: '/ListaProjetosConcluidos',
			templateUrl: 'views/listaProjetosConcluidos.html'
	}
	
	  $urlRouterProvider.otherwise('/');
	  $stateProvider.state(home);
	  $stateProvider.state(projeto);
	  $stateProvider.state(usuario);
	  $stateProvider.state(disciplina);
	  $stateProvider.state(avaliacao);
	  $stateProvider.state(exercicio);
	  $stateProvider.state(RespostaAvaliacao);
	  $stateProvider.state(cadastrosAdmin);
	  $stateProvider.state(listaProjetos);
	  $stateProvider.state(meusProjetos);
	  $stateProvider.state(alterarProjeto);
	  $stateProvider.state(detalhesProjeto);
	  $stateProvider.state(feed);
	  $stateProvider.state(perfil);
	  $stateProvider.state(altPerfil);
	  $stateProvider.state(listaNotificacoes);
	  $stateProvider.state(listaAvaliacoes);
	  $stateProvider.state(listaExercicios);
	  $stateProvider.state(listaDisciplinas);
	  $stateProvider.state(listaProjetosConcluidos);
}

function config($rootScope){
	$rootScope.pattern_url = 'http://localhost:8080/ProjetoPAP/';
	//$rootScope.pattern_url = 'http://wecanprojetos.com.br/';
	
	$rootScope.GetPostconfig = { headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}
	
	$rootScope.popUpNotificacao = function(text, type){
    	$.notify({
        	icon: 'pe-7s-gift',
        	message: text
        },{
            type: type,
            timer: 4000
        });
	}
}