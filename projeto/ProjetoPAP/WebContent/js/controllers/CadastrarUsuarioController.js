angular.module("app").controller('CadastrarUsuarioCtrl', function($scope, $http, $rootScope) {
		
	//Busca informações do Tipos de usuarios
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações do estados
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de cidades
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de instituicoes de Ensino
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de cursos
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(usuario) {
		//console.log(usuario);
		var valNome = /(?=^.{2,60}$)^[A-ZZZZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][a-záàâãéèêíïóôõöúçñ]+(?:[ ](?:da|das|do|dos|de|e|[A-ZZZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ][a-zzáàâãéèêíïóôõöúçñ]+))*$/;
		//console.log(valNome.test(usuario.nomeUsuario));
		if (typeof usuario != 'undefined'){
			if(usuario.tipoUsuario != null){
				if(usuario.nomeUsuario != null && valNome.test(usuario.nomeUsuario)){
					if(usuario.usernameUsuario != null){
						if(usuario.emailUsuario != null){
							if(usuario.senhaUsuario != null){
								if(usuario.cidadeUsuario != null){
									if(usuario.instituicaoUsuario != null){
										if(usuario.cursoUsuario != null){
											var parameter = JSON.stringify({
												type : "usuario",
												nomeUsuario : usuario.nomeUsuario,
												usernameUsuario : usuario.usernameUsuario,
												emailUsuario : usuario.emailUsuario,
												senhaUsuario : usuario.senhaUsuario,
												tipoUsuario : usuario.tipoUsuario,
												cidadeUsuario : usuario.cidadeUsuario,
												instituicaoUsuario : usuario.instituicaoUsuario,
												cursoUsuario : usuario.cursoUsuario
											});

											var config = {
												headers : {
													'Content-Type' : 'application/json;charset=utf-8;'
												}
											}

											$http.post(
													'http://localhost:8080/ProjetoPAP/rest/usuariorest/postcad',
													parameter, config).success(
													function(data, status, headers, config) {
														if(data=="Username duplicado"){
															console.log(data);
															swal("Este username já está em uso. Por favor, escolha outro.");
														}
														else{
															window.location.href = "http://localhost:8080/ProjetoPAP/home.html";
														}	
											});
										}
										else{
											swal("Preencha o seu curso.");
										}
									}
									else{
										swal("Preencha a sua instituição de ensino.");
									}
								}
								else{
									swal("Preencha a sua cidade.");
								}
							}
							else{
								swal("Você deve digitar uma senha.");
							}
						}
						else{
							swal("Preencha corretamente o seu email.");
						}
					}
					else{
						swal("Preencha o seu username.");
					}
				}
				else{
					swal("Preencha o seu nome completo.");
				}
			}
			else{
				swal("Preencha um tipo de usuário");
			}
		}
		else{
			swal("Preencha as informações do usuario");
		}
	}

	// função que inicia a tela
	$scope.iniciaTela = function() {
		$scope.BuscarInformacaoTipoUsuarios();
		$scope.BuscarInformacaoEstados();
		$scope.BuscarInformacaoCidades();
		$scope.BuscarInformacaoInstituicoes();
		$scope.BuscarInformacaoCursos();
	};
	$scope.iniciaTela();
});