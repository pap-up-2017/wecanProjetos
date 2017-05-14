angular.module("app").controller('DashBoardCtrl', function($scope, $http, $cookieStore, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_username");
	$scope.idUsuarioLogado = $cookieStore.get("session_user_id");

	// Busca projetos do usuario 
	$scope.BuscarMeusProjetos = function() {
		console.log("função BuscarMeusProjetos..");

		$http.get($rootScope.pattern_url+'rest/projetorest/buscaPorUsuario/'+$scope.idUsuarioLogado)
				.success(function(data) {
					//console.log(data["projeto"]);
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
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	$scope.gerarPorcentTarefas = function(projeto){
	
	}
	$scope.BuscarMeusProjetos();
	
	
});