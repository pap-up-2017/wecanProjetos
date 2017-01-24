var app = angular.module("app", [ "ngRoute" ]);
console.log("routeProvider");
app.config(function($routeProvider) {

	$routeProvider
    .when("/cadEstado", {
        templateUrl : "views/cadEstado.html"
    });
});	

app.controller('HttpGetController', function($scope, 
		$http) {
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/e-commerce/rest/restCliente')
				.success(function(data) {
					$scope.cliente = data["cliente"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	$scope.BuscarInformacao();
});
	
app.controller("HttpPostController", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {

		var parameter = JSON.stringify({
			type : "cliente",
			nome : $scope.nome,
			login : $scope.login,
			senha : $scope.senha
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/e-commerce/rest/restCliente/post',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Cliente Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});

app.controller('HttpGetControllerFornecedor', function($scope, 
		$http) {
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/e-commerce/rest/restFornecedor')
				.success(function(data) {
					$scope.fornecedor = data["fornecedor"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	$scope.BuscarInformacao();
});
	
app.controller("HttpPostControllerFornecedor", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {

		var parameter = JSON.stringify({
			type : "fornecedor",
			nome : $scope.nome,
			nomeFantasia : $scope.nomeFantasia,
			cnpj : $scope.cnpj,
			ie : $scope.ie,
		});
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/e-commerce/rest/restFornecedor/post',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Fornecedor Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});

app.controller('HttpGetControllerPrato', function($scope, 
		$http) {
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/e-commerce/rest/restPrato')
				.success(function(data) {
					$scope.prato = data["prato"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	$scope.BuscarInformacao();
});
	
app.controller("HttpPostControllerPrato", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {

		var parameter = JSON.stringify({
			type : "prato",
			nome : $scope.nome,
			categoria : $scope.categoria,
			valor : $scope.valor,
		});
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/e-commerce/rest/restPrato/post',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Prato Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});

app.controller('HttpGetControllerFuncionario', function($scope, 
		$http) {
	$scope.BuscarInformacao = function() {

		$http.get('http://localhost:8080/e-commerce/rest/restFuncionario')
				.success(function(data) {
					$scope.funcionario = data["funcionario"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	$scope.BuscarInformacao();
});
	
app.controller("HttpPostControllerFuncionario", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {

		var parameter = JSON.stringify({
			type : "funcionario",
			nome : $scope.nome,
			cpf : $scope.cpf,
			carteiratrabalho : $scope.carteiratrabalho,
			idade : $scope.idade,
			datanasc : $scope.datanasc,			
		});
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/e-commerce/rest/restFuncionario/post',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Funcionario Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};

});