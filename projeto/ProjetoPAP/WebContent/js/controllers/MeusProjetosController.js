angular.module("app").controller('PageMeusProjetosCtrl', function($scope, $http, $cookieStore) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarMeusProjetos = function(idUsuario) {
		console.log("função BuscarMeusProjetos..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest/'+$scope.UsuarioLogado)
				.success(function(data) {
					console.log(data["projeto"]);
					$scope.projetos = data["projeto"];
					
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// função que inicia a tela
		$scope.iniciaTela = function() {
			console.log("Iniciando a tela de meu projetos");
			$scope.BuscarMeusProjetos();
		};
		$scope.iniciaTela();
	
});

