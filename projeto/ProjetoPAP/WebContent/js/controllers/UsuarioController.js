angular.module("app").controller('UsuarioCtrl', function($scope, $http, $cookieStore, $state, $rootScope) {
		
	//Busca Tipos usuarios
	$scope.BuscarInformacaoTipoUsuarios = function() {
		$http.get('http://localhost:8080/ProjetoPAP/rest/tipousuariorest')
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
		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
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
		$http.get('http://localhost:8080/ProjetoPAP/rest/cidaderest')
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
		$http.get('http://localhost:8080/ProjetoPAP/rest/instituicaorest')
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
		$http.get('http://localhost:8080/ProjetoPAP/rest/cursorest')
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
		$http.post('http://localhost:8080/ProjetoPAP/rest/usuariorest/busca/'+$cookieStore.get("session_user_id"))
		.success(function(data) {
			$scope.usuario = data;	
			$scope.estadoSelecionado = $scope.usuario.cidadeUsuario.estadoCidade;
		});
	};
	
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(){
		
		var trocaSenha = false;
		
		if($scope.senhaUsuarioNew != null){
			console.log("new "+$scope.senhaUsuarioNew);
			if($scope.senhaUsuarioOld != null){
				console.log("Old "+$scope.senhaUsuarioOld);
				$http.post( 'http://localhost:8080/ProjetoPAP/rest/usuariorest/cripSenha/'+$scope.senhaUsuarioOld)
				.success( function(data, status, headers, config) {
					console.log("Old crip "+ data);
					if($scope.usuario.senhaUsuario == data){
						$http.post( 'http://localhost:8080/ProjetoPAP/rest/usuariorest/cripSenha/'+$scope.senhaUsuarioNew)
						.success( function(data, status, headers, config) {
							console.log("new crip "+ data);
							$scope.usuario.senhaUsuario = data;
							trocaSenha = true;
							console.log("nova senha banco: "+ $scope.usuario.senhaUsuario); 
						});
					}
					else{
						swal("Senha antiga incorreta.");
					}
					
				});
			}
			else{
				swal("Você deve digitar sua senha antiga.");
			}
		}
		
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
		
		console.log(parameter);
		var config = {headers : {
				'Content-Type' : 'application/json;charset=utf-8;'}}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/usuariorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					if(data=="Username duplicado"){
						console.log(data);
						swal("Este username já está em uso. Por favor, escolha outro.");
					}
					else{
						$state.go("perfil", { "idUsuario": $cookieStore.get("session_user_id")});
					}	
		});
	};
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
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