angular.module("app").controller('PerfilCtrl', function($scope, $http, $cookieStore) {
	
	// Busca informação para preenchimento do perfil
	$scope.BuscarInformacao = function() {
		$http.post('http://localhost:8080/ProjetoPAP/rest/usuariorest/busca/'+$cookieStore.get("session_user_id"))
				.success(function(data) {
					$scope.nomeUsuario = (data["nomeUsuario"]);
					$scope.cursoUsuario = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuario = (data["instituicaoUsuario"]["nomeInstituicao"]);					
				});
	};
	$scope.BuscarInformacao();
});