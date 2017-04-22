angular.module("app").controller('PerfilCtrl', function($scope, $http, $cookieStore, $state	) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca informação para preenchimento do perfil
	$scope.BuscarInformacao = function() {
		$http.post('http://localhost:8080/ProjetoPAP/rest/usuariorest/busca/'+$scope.UsuarioLogado)
				.success(function(data) {
					$scope.nomeUsuario = data["nomeUsuario"];
					$scope.usernameUsuario = data["usernameUsuario"];
					$scope.emailUsuario = data["emailUsuario"];
					$scope.tipoUsuario = (data["tipoUsuario"]["tipoUsuario"]);
					$scope.cursoUsuario = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuario = (data["instituicaoUsuario"]["nomeInstituicao"]);	
				});
	};
	
	// Busca informação para preenchimento do perfil
	$scope.detalharUsuario = function() {
		$http.post('http://localhost:8080/ProjetoPAP/rest/usuariorest/busca/'+$stateParams.idUsuario)
				.success(function(data) {
					$scope.nomeUsuariod = data["nomeUsuario"];
					$scope.usernameUsuariod = data["usernameUsuario"];
					$scope.emailUsuariod = data["emailUsuario"];
					$scope.tipoUsuariod = (data["tipoUsuario"]["tipoUsuario"]);
					$scope.estadoUsuariod = (data["cidadeUsuario"]["estadoCidade"]["nomeEstado"]);
					$scope.cidadeUsuariod = (data["cidadeUsuario"]["nomeCidade"]);
					$scope.cursoUsuariod = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuariod = (data["instituicaoUsuario"]["nomeInstituicao"]);	
				});
	};
	$scope.BuscarInformacao();
});