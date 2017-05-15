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
	
	$scope.buscaCards = function(){
		$http.post($rootScope.pattern_url+'rest/projetorest/cards/'+$scope.idUsuarioLogado)
		.success(function(data) {
			var cardsBanco = data["cardsDashBoard"];
			var arrayBanco = [];
			if(Array.isArray(cardsBanco)){
				arrayBanco = cardsBanco; 
			}
			else{
				arrayBanco.push(cardsBanco);
			}
			$scope.cardsProjetos = arrayBanco;
			
		}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	}
	$scope.BuscarMeusProjetos();
	$scope.buscaCards();
	
	$scope.functionThatReturnsStyle = function(valor) {
		var style1 = "width: "+valor+"%";
		}
	
});