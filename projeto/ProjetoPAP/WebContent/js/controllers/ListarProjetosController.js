angular.module("app").controller('ListarProjetosCtrl', function($scope, $http, $stateParams, $cookieStore, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");

	// Busca informação para preenchimento do perfil
	$scope.BuscarPerfilUsuario = function() {
		$http.post($rootScope.pattern_url+'rest/usuariorest/busca/'+$scope.UsuarioLogado)
				.success(function(data) {
					$scope.cursoUsuario = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuario = (data["instituicaoUsuario"]["nomeInstituicao"]);
				});
	};
	
	$scope.habilitarCursoUsuario = function(){
		$scope.funcaoHabilitarCursoUsuario = !$scope.funcaoHabilitarCursoUsuario;
		if($scope.funcaoHabilitarCursoUsuario){
			$scope.checkBoxCursoUsuario = $scope.cursoUsuario;
		}
		else{
			$scope.checkBoxCursoUsuario = "";
		}
	}
	
	$scope.habilitarInstituicaoUsuario = function(){
		$scope.funcaoHabilitarInstituicaoUsuario = !$scope.funcaoHabilitarInstituicaoUsuario;
		if($scope.funcaoHabilitarInstituicaoUsuario){
			$scope.checkBoxInstituicaoUsuario = $scope.instituicaoUsuario;
		}
		else{
			$scope.checkBoxInstituicaoUsuario = "";
		}
	}
	
	// Busca projetos geral
	$scope.BuscarInformacao = function() {

		$http.get($rootScope.pattern_url+'rest/projetorest')
				.success(function(data) {
					var projetosBanco = data["projeto"];
					var arrayBanco = [];
					if(Array.isArray(projetosBanco)){
						arrayBanco = projetosBanco; 
					}
					else{
						arrayBanco.push(projetosBanco);
					}
					$scope.projetos = arrayBanco;
				}).error(
						function(data, status, header, config) {
							swal("Não foi possivel listar, por favor tente novamente.");					
						});
	};
	
	// Busca projetos geral
	$scope.BuscarProjetosUsuario = function() {
		$http.get($rootScope.pattern_url+'rest/projetorest/buscaPorUsuario/'+$scope.UsuarioLogado)
				.success(function(data) {
					if(data != null){
						var projetosBanco = data["projeto"];
						var arrayBanco = [];
						if(Array.isArray(projetosBanco)){
							arrayBanco = projetosBanco; 
						}
						else{
							arrayBanco.push(projetosBanco);
						}
						$scope.projetosPorUsuario = arrayBanco;
					}
				}).error(
						function(data, status, header, config) {
							swal("Não foi possivel listar, por favor tente novamente.");					
						});
	};
		
	// Busca projetos do usuário
	$scope.BuscarMeusProjetos = function() {
		$http.get($rootScope.pattern_url+'rest/projetorest/user/'+$scope.UsuarioLogado)
				.success(function(data) {
					if(data != null){
						var projetosBanco = data["projeto"];
						var arrayBanco = [];
						if(Array.isArray(projetosBanco)){
							arrayBanco = projetosBanco; 
						}
						else{
							arrayBanco.push(projetosBanco);
						}
						$scope.meusProjetos = arrayBanco;
					}
				}).error(
						function(data, status, header, config) {
							swal("Não foi possivel listar, por favor tente novamente.");					
						});
	};
	
	$scope.BuscarInformacao();
	$scope.BuscarMeusProjetos();	
	$scope.BuscarProjetosUsuario();
	$scope.BuscarPerfilUsuario();
	$scope.funcaoHabilitarCursoUsuario = false;
	$scope.funcaoHabilitarInstituicaoUsuario = false;
});



