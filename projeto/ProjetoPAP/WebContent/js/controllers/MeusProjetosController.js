angular.module("app").controller('PageMeusProjetosCtrl', function($scope, $http, $cookieStore, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarMeusProjetos = function(idUsuario) {

		$http.get($rootScope.pattern_url+'rest/projetorest/user/'+$scope.UsuarioLogado)
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
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(projeto){

		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto : projeto.idProjeto,
			nome : projeto.nome,
			descricao : projeto.descricao,
			dataentrega : projeto.dataentrega
			
		});

		$http.post($rootScope.pattern_url+'rest/projetorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Projeto excluido com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarMeusProjetos();
		
	};
	
	// função que inicia a tela
		$scope.iniciaTela = function() {
			$scope.BuscarMeusProjetos();
		};
		$scope.iniciaTela();
	
});

