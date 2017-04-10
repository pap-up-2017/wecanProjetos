angular.module("app").controller('PageUsuarioCtrl', function($scope, $http) {
	
	$scope.editedUsuario;
	
	// Busca informações no banco.. 
	$scope.BuscarInformacao = function() {
		$http.get('http://localhost:8080/ProjetoPAP/rest/usuariorest')
				.success(function(data) {
					var usuariosBanco = data["usuario"];
					var arrayBanco = [];
					if(Array.isArray(usuariosBanco)){
						arrayBanco = usuariosBanco; 
					}
					else{
						arrayBanco.push(usuariosBanco);
					}
					$scope.usuarios = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
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
					}
					else{
						window.location.href = "http://localhost:8080/ProjetoPAP/index.html";
					}
					
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
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedUsuario){
		console.log("Salvar uma nova Alteração ...")
		// TODO arrumar carregamento automatico do dropDownlist..
		var parameter = JSON.stringify({
			type : "usuario",
			idUsuario : $scope.editedIdUsuario,
			nomeUsuario : $scope.editedNomeUsuario,
			usernameUsuario : $scope.editedUsernameUsuario,
			emailUsuario : $scope.editedEmailUsuario,
			senhaUsuario : $scope.editedSenhaUsuario,
			tipoUsuario : $scope.editedTipoUsuario,
			cidadeUsuario : $scope.editedCidadeUsuario,
			instituicaoUsuario : $scope.editedInstituicaoUsuario,
			cursoUsuario : $scope.editedCursoUsuario
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/usuariorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Usuario salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	// TODO fazer carregamento do combobox com o estado para edição
	$scope.CarregarEdicao = function(usuario){
		$scope.istrue=true;
		$scope.editedIdUsuario = usuario.idUsuario;
		$scope.editedNomeUsuario = usuario.nomeUsuario;	
		$scope.editedUsernameUsuario = usuario.usernameUsuario;
		$scope.editedEmailUsuario = usuario.emailUsuario;
		$scope.editedSenhaUsuario = usuario.senhaUsuario;
		$scope.editedTipoUsuario = usuario.tipoUsuario;
		$scope.editedEstadoSelecionado = usuario.cidadeUsuario.estadoCidade;
		$scope.editedCidadeUsuario = usuario.cidadeUsuario;
		$scope.editedInstituicaoUsuario = usuario.instituicaoUsuario;
		$scope.editedCursoUsuario = usuario.cursoUsuario;
		
		$scope.editedTipoUsuarioOld = usuario.tipoUsuario;
		$scope.editedCidadeUsuarioOld = usuario.cidadeUsuario;
		$scope.editedInstituicaoUsuarioOld = usuario.instituicaoUsuario;
		$scope.editedCursoUsuarioOld = usuario.cursoUsuario;
		$scope.editedEstadoSelecionadoOld = usuario.cidadeUsuario.estadoCidade;
		
	    console.log(usuario);
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
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