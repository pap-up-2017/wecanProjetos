angular.module("app").controller('ItemProjetoCtrl', function($scope, $http, $rootScope) {
	
	// Busca informações salvas no banco... via rest
	$scope.BuscarInformacao = function() {

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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// Busca informações de todos as faculdades salvas no banco..
	// para carregar o comboBox..
	$scope.BuscarInformacaoInstituuicoesEnsino = function() {

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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};
	
	// envia a informação de um novo cadastro no banco .. via rest .. 
	$scope.SalvarCadastro = function(curso) {

		var parameter = JSON.stringify({
			type : "curso",
			nomeCurso : curso.nomeCurso,
			instituicaoCurso : curso.instituicaoCurso
		});

		$http.post($rootScope.pattern_url+'rest/cursorest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Curso Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidCurso, editednameCurso, editedInstituicaoCurso){
		
		var parameter = JSON.stringify({
			type : "curso",
			idCurso : editedidCurso,
			nomeCurso : editednameCurso,
			instituicaoCurso : editedInstituicaoCurso
		});

		$http.post($rootScope.pattern_url+'rest/cursorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Curso salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(curso){

		var parameter = JSON.stringify({
			type : "curso",
			idCurso : curso.idCurso,
			nomeCurso : curso.nomeCurso,
			instituicaoCurso : curso.instituicaoCurso
		});

		$http.post($rootScope.pattern_url+'rest/cursorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Curso excluido com Sucesso!';
					
					
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
	$scope.CarregarEdicao = function(curso){
		$scope.istrue=true;
	    $scope.editedidCurso = curso.idCurso;
	    $scope.editednameCurso = curso.nomeCurso;
	    $scope.editedInstituicaoCurso = curso.instituicaoCurso;
	    $scope.editedInstituicaoCursoOld = curso.instituicaoCurso;
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoInstituuicoesEnsino();
	};
	$scope.iniciaTela();
});