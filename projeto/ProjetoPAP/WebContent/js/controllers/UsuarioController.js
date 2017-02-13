angular.module("app").controller('PageUsuarioCtrl', function($scope, $http) {
	
	// Busca informações no banco.. 
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/usuariorest')
				.success(function(data) {
					$scope.usuarios = data["usuario"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações do Tipos de usuarios
	$scope.BuscarInformacaoTipoUsuarios = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/tipousuariorest')
				.success(function(data) {
					$scope.tipoUsuarios = data["tipoUsuario"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações do estados
	$scope.BuscarInformacaoEstados = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
				.success(function(data) {
					$scope.estados = data["estado"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de cidades
	$scope.BuscarInformacaoCidades = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/cidaderest')
				.success(function(data) {
					$scope.cidades = data["cidade"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de instituicoes de Ensino
	$scope.BuscarInformacaoInstituicoes = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/instituicaorest')
				.success(function(data) {
					$scope.instituicoes = data["instituicaoEnsino"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	//Busca informações de cursos
	$scope.BuscarInformacaoCursos = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/cursorest')
				.success(function(data) {
					$scope.cursos = data["curso"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(usuario) {
		console.log("Salvar um novo cadastro ...")

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
					$scope.Resposta = 'Usuario salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(usuario){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "usuario",
			idUsuario : usuario.idUsuario,
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
				'http://localhost:8080/ProjetoPAP/rest/usuariorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Usuario excluido com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
							
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoTipoUsuarios();
		$scope.BuscarInformacaoEstados();
		$scope.BuscarInformacaoCidades();
		$scope.BuscarInformacaoInstituicoes();
		$scope.BuscarInformacaoCursos();
	};
	$scope.iniciaTela();
});