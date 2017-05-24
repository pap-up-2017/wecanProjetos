angular.module("app").controller('loginCtrl', function($scope, $http, $cookieStore, $rootScope) {
	
	// envia informação para validar Login ... 
	$scope.ValidarLogin = function() {
		postValidarLogin();
	};
	$scope.logout = function() {
		postDestroySession();
	};
	
	postDestroySession = function(){
		
		$http.post($rootScope.pattern_url+'rest/loginrest/logout/'+$cookieStore.get("session_id"))
		.success(function(data){
			console.log(data);
			$cookieStore.remove("session_id");
			$cookieStore.remove("session_user_id");
			$cookieStore.remove("session_data_val");
			$cookieStore.remove("session_token_val");
			$cookieStore.remove("session_tipo_usuario");
			$cookieStore.remove("session_username");
			window.location.href = $rootScope.pattern_url+"home.html";
		});
	}
	
	postValidarLogin = function(){
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
		$http.post($rootScope.pattern_url+'rest/loginrest/login',
				parameter, config).success(
				function(data, status, headers, config) {
					if(loginfactory(data)){
						window.location.href = $rootScope.pattern_url+"index.html";
					}
					else{
						swal("Login incorreto.");
					}
				}).error(
				function(data, status, header, config) {});
	}
	
	loginfactory = function(data){
		$cookieStore.put("session_id",data["id"]);
		$cookieStore.put("session_user_id",data["idUsuarioLogado"]);
		$cookieStore.put("session_data_val",data["dataCriacao"]);
		$cookieStore.put("session_token_val",data["token"]);
		$cookieStore.put("session_tipo_usuario",data["tipoUsuarioLogado"]);
		$cookieStore.put("session_username",data["usernameUsuarioLogado"]);
		if($cookieStore.get("session_user_id") == null){
			return false;
		}
		else{
			return true;
		}
	}
});