angular.module("app").controller('HomePageCtrl', function($scope, $http) {
	
	// envia informação para validar Login ... 
	$scope.ValidarLogin = function() {
		console.log("validar login();")

		var parameter = JSON.stringify({
			type : "login",
			usernameLogin : $scope.usernameLogin,
			senhaUsername : $scope.senhaUsername
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}
		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/loginrest/postlogin',
				parameter, config).success(
				function(data, status, headers, config) {
					console.log(data["token"]);
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};
	
});