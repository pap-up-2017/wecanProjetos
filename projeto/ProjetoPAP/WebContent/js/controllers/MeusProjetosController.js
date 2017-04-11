angular.module("app").controller('PageMeusProjetosCtrl', function($scope, $http, $cookieStore) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarMeusProjetos = function(idUsuario) {
		console.log("função BuscarMeusProjetos..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest/user/'+$scope.UsuarioLogado)
				.success(function(data) {
					//console.log(data["projeto"]);
					$scope.projetos = data["projeto"];
					
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(projeto){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto : projeto.idProjeto,
			nome : projeto.nome,
			descricao : projeto.descricao,
			dataentrega : projeto.dataentrega
			
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/postdel',
				parameter, config).success(
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
			console.log("Iniciando a tela de meu projetos");
			$scope.BuscarMeusProjetos();
		};
		$scope.iniciaTela();
	
});

