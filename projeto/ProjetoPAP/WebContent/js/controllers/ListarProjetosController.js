angular.module("app").controller('ListarProjetosCtrl', function($scope, $http, $stateParams, $cookieStore) {
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest')
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
				});
	};
	
	$scope.BuscarInformacao();
});

