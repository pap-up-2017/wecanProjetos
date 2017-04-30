angular.module("app").controller('IndexCtrl', function($scope, $http, $cookieStore) {
	$scope.tipoUsuarioLogado = $cookieStore.get("session_tipo_usuario");
	
	$scope.tipoUsuarioFiltro = function(){
		if($scope.tipoUsuarioLogado == "Administrador"){
			return true;
		}
		else{
			return false;
		}
	}
});