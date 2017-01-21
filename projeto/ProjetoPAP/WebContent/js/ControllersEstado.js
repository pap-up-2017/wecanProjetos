var app = angular.module("cadEstado", []);
app.controller('HttpGetControllerEstado', function($scope, 
		$http) {
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
				.success(function(data) {
					$scope.estado = data["estado"];
				});
	};

	$scope.BuscarInformacao();
});

app.controller("HttpPostControllerEstado", function(
		$scope,
		$http) {

	$scope.EnviarInformacao = function() {

		var parameter = JSON.stringify({
			type : "estado",
			nomeEstado : $scope.nome,
			siglaEstado : $scope.sigla,
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/estadorest',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});