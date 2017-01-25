app.controller('HttpGetEstadoCtrl', function($scope, 
		$http) {
	
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao();");

		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
				.success(function(data) {
					$scope.estado = data["estado"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	$scope.BuscarInformacao();
});

app.controller("HttpPostEstadoCtrl", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {
		console.log("função EnviarInformacao();")

		var parameter = JSON.stringify({
			type : "estado",
			nomeEstado : $scope.nomeEstado,
			siglaEstado : $scope.siglaEstado
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/estadorest/post',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});