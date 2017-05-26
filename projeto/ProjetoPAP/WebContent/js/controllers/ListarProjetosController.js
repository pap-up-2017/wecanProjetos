angular.module("app").controller('ListarProjetosCtrl', function($scope, $http, $stateParams, $cookieStore, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
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
});



