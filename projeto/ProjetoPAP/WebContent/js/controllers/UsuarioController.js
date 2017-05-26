angular.module("app").controller('UsuarioCtrl', function($scope, $http, $cookieStore, $state, $rootScope) {
		
	//Busca Tipos usuarios
	$scope.BuscarInformacaoTipoUsuarios = function() {
		$http.get($rootScope.pattern_url+'rest/tipousuariorest')
				.success(function(data) {
					var tipousuariosBanco = data["tipoUsuario"];
					var arrayBanco = [];
					if(Array.isArray(tipousuariosBanco)){
						arrayBanco = tipousuariosBanco; 
					}
					else{
						arrayBanco.push(tipousuariosBanco);
					}
					$scope.tipoUsuarios = arrayBanco;
				});
	};
	
	//Busca estados
	$scope.BuscarInformacaoEstados = function() {
		$http.get($rootScope.pattern_url+'rest/estadorest')
				.success(function(data) {
					var estadosBanco = data["estado"];
					var arrayBanco = [];
					if(Array.isArray(estadosBanco)){
						arrayBanco = estadosBanco; 
					}
					else{
						arrayBanco.push(estadosBanco);
					}
					$scope.estados = arrayBanco;
				});
	};
	
	//Busca cidades
	$scope.BuscarInformacaoCidades = function() {
		$http.get($rootScope.pattern_url+'rest/cidaderest')
				.success(function(data) {
					var cidadesBanco = data["cidade"];
					var arrayBanco = [];
					if(Array.isArray(cidadesBanco)){
						arrayBanco = cidadesBanco; 
					}
					else{
						arrayBanco.push(cidadesBanco);
					}
					$scope.cidades = arrayBanco;
				});
	};
	
	//Busca instituições
	$scope.BuscarInformacaoInstituicoes = function() {
		$http.get($rootScope.pattern_url+'rest/instituicaorest')
				.success(function(data) {
					var instituicoesBanco = data["instituicaoEnsino"];
					var arrayBanco = [];
					if(Array.isArray(instituicoesBanco)){
						arrayBanco = instituicoesBanco; 
					}
					else{
						arrayBanco.push(instituicoesBanco);
					}
					$scope.instituicoes = arrayBanco;
				});
	};
	
	//Busca cursos
	$scope.BuscarInformacaoCursos = function() {
		$http.get($rootScope.pattern_url+'rest/cursorest')
				.success(function(data) {
					var cursosBanco = data["curso"];
					var arrayBanco = [];
					if(Array.isArray(cursosBanco)){
						arrayBanco = cursosBanco; 
					}
					else{
						arrayBanco.push(cursosBanco);
					}
					$scope.cursos = arrayBanco;
				});
	};
	
	$scope.carregaEdição = function(){
		$http.post($rootScope.pattern_url+'rest/usuariorest/busca/'+$cookieStore.get("session_user_id"))
		.success(function(data) {
			$scope.usuario = data;	
			$scope.estadoSelecionado = $scope.usuario.cidadeUsuario.estadoCidade;
			$scope.trocarSenha = false;
		});
	};
	
	$scope.habilitarTrocarSenha = function(){
		$scope.trocarSenha = !$scope.trocarSenha;
	}
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(){
		if($scope.trocarSenha){
			if($scope.senhaUsuarioOld != null && typeof $scope.senhaUsuarioOld != 'undefined' && $scope.senhaUsuarioOld != ""){
				$http.post($rootScope.pattern_url+'rest/usuariorest/cripSenha/'+$scope.senhaUsuarioOld)
				.success( function(data, status, headers, config) {
					if($scope.usuario.senhaUsuario == data ){
						if($scope.senhaUsuarioNew != null && typeof $scope.senhaUsuarioNew != 'undefined' && $scope.senhaUsuarioNew != ""){
							$http.post($rootScope.pattern_url+'rest/usuariorest/cripSenha/'+$scope.senhaUsuarioNew)
							.success( function(data, status, headers, config) {
								$scope.usuario.senhaUsuario = data;
								trocaSenha = true; 
								enviaAlteracoesBanco();
							});
						}
						else{
							$rootScope.popUpNotificacao("Você deve digitar a nova senha.","danger");	
						}
					}
					else{
						$rootScope.popUpNotificacao("Senha antiga incorreta.","danger");	
					}	
				});	
			}
			else{
				$rootScope.popUpNotificacao("Você deve digitar a senha antiga.","danger");	
			}
		}
		else{
			enviaAlteracoesBanco();
		}
	}
	
	var enviaAlteracoesBanco = function(){
		$scope.senhaUsuarioNew = null;
		$scope.senhaUsuarioOld = null;
		var parameter = JSON.stringify({
			type : "usuario",
			idUsuario : $scope.usuario.idUsuario,
			nomeUsuario : $scope.usuario.nomeUsuario,
			usernameUsuario : $scope.usuario.usernameUsuario,
			emailUsuario : $scope.usuario.emailUsuario,
			senhaUsuario : $scope.usuario.senhaUsuario,
			tipoUsuario : $scope.usuario.tipoUsuario,
			cidadeUsuario : $scope.usuario.cidadeUsuario,
			instituicaoUsuario : $scope.usuario.instituicaoUsuario,
			cursoUsuario : $scope.usuario.cursoUsuario
		});	
		
		$http.post($rootScope.pattern_url+'rest/usuariorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					if(data=="Username duplicado"){
						swal("Este username já está em uso. Por favor, escolha outro.");
					}
					else{
						$state.go("perfil", { "idUsuario": $cookieStore.get("session_user_id")});
					}	
		});
	}	

	// função que inicia a tela
	$scope.iniciaTela = function() {
		$scope.BuscarInformacaoTipoUsuarios();
		$scope.BuscarInformacaoEstados();
		$scope.BuscarInformacaoCidades();
		$scope.BuscarInformacaoInstituicoes();
		$scope.BuscarInformacaoCursos();
		$scope.carregaEdição();
	};
	
	$scope.iniciaTela();	
	
	loginfactory = function(data){
		$cookieStore.put("session_id",data["id"]);
		$cookieStore.put("session_user_id",data["idUsuarioLogado"]);
		$cookieStore.put("session_data_val",data["dataCriacao"]);
		$cookieStore.put("session_token_val",data["token"]);
		$cookieStore.put("session_tipo_usuario",data["tipoUsuarioLogado"]);
	}
});