angular.module("app").controller('HomePageCtrl', function($scope, $http, $cookies, $cookieStore) {
	
	// envia informação para validar Login ... 
	$scope.ValidarLogin = function() {
		
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
					if(loginfactory(data)){
						window.location.href = "http://localhost:8080/ProjetoPAP/index.html";
					}
					else{
						console.log("login incorreto");
					}
				}).error(
				function(data, status, header, config) {});
	};
	
	loginfactory = function(data){
		$cookieStore.put("session_id",data["id"]);
		$cookieStore.put("session_user_id",data["idUsuarioLogado"]);
		$cookieStore.put("session_data_val",data["dataCriacao"]);
		$cookieStore.put("session_token_val",data["token"]);
		$cookieStore.put("session_tipo_usuario",data["tipoUsuarioLogado"]);
		if($cookieStore.get("session_user_id") == null){
			return false;
		}
		else{
			return true;
		}
	}
	
});