angular.module("app").controller('UsuarioCtrl', function($scope, $http, $cookieStore) {
		
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
					$scope.Resposta = 'Usuario salvo com Sucesso!';
					console.log($scope.Resposta);
					});
	};
	
/*	// carrega os dados do elemento selecionado para edição .. 
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
	};*/
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
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
});