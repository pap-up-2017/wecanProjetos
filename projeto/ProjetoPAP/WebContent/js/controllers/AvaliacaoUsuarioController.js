angular.module("app").controller('AvaliacoUsuarioCtrl', function($scope, $http, $rootScope, $cookieStore) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca os itens disponiveis ... 
	$scope.BuscarItensDisponiveis = function() {

		$http.get($rootScope.pattern_url+'rest/itemusuariorest')
				.success(function(data) {
					var itensBanco = data["itemAvaliacaoUsuario"];
					var arrayBanco = [];
					if(Array.isArray(itensBanco)){
						arrayBanco = itensBanco; 
					}
					else{
						arrayBanco.push(itensBanco);
					}
					$scope.itensUsuario = arrayBanco;
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	// Busca as avaliacoes por projeto no banco 
	$scope.BuscarAvaliacoesPorProjeto = function() {

		$http.get($rootScope.pattern_url+'rest/avaliacaousuariorest/getporprojeto/')
				.success(function(data) {
					var itensBanco = data["itemAvaliacaoUsuario"];
					var arrayBanco = [];
					if(Array.isArray(itensBanco)){
						arrayBanco = itensBanco; 
					}
					else{
						arrayBanco.push(itensBanco);
					}
					$scope.itensUsuario = arrayBanco;
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	$scope.salvarAvaliacao = function(nota, item, usuarioAvaliado, projeto){

		var parameter = JSON.stringify({
			type : "avaliacaoUsuario",
			notaAvaliacao : nota,
			itemAvaliado : item,
			usuarioAvaliado : usuarioAvaliado,
			projeto : projeto
		});
		
		console.log("usuarioAvaliado: "+usuarioAvaliado.nomeUsuario +" | nota: "+nota +" | item: "+item.nomeItem);
		console.log("usuarioAvaliador: "+$scope.UsuarioLogado);
		
		$http.post($rootScope.pattern_url+'rest/avaliacaousuariorest/postcad/'+$scope.UsuarioLogado,
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Avaliacao Salva com Sucesso!';
					
				}).error(
				function(data, status, header, config) {
					console.log("Data: " + data + " | status: " + status + " | headers: " + header
							+ " | config: " + config);
				});
	}

	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		$scope.BuscarItensDisponiveis();
	};
	$scope.iniciaTela();
});