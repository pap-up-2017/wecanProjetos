angular.module("app").controller('PageInstituicaoCtrl', function($scope, $http, $rootScope) {
	
	// Busca informações de todos os cidades salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		
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
	
	// Busca informações de todos os estados salvos no banco ... Via rest
	// para carregar o comboBox..
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	// Busca informações de todos os cidades salvas no banco ... Via rest
	// para carregar o comboBox..
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
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(instituicao) {

		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			nomeInstituicao : instituicao.nomeInstituicao,
			cidadeInstituicao : instituicao.cidadeInstituicao
		});
		
		$http.post($rootScope.pattern_url+'rest/instituicaorest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidInstituicao, editednameInstituicao, editedCidadeInstituicao){

		// TODO arrumar carregamento automatico do dropDownlist..
		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			idInstituicao : editedidInstituicao,
			nomeInstituicao : editednameInstituicao,
			cidadeInstituicao : editedCidadeInstituicao
		});

		$http.post($rootScope.pattern_url+'rest/instituicaorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(instituicao){

		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			idInstituicao : instituicao.idInstituicao,
			nomeInstituicao : instituicao.nomeInstituicao,
			cidadeInstituicao : instituicao.cidadeInstituicao
		});

		$http.post($rootScope.pattern_url+'rest/instituicaorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao excluido com Sucesso!';
					
					
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
	$scope.CarregarEdicao = function(instituicao){
		$scope.istrue=true;
	    $scope.editedidInstituicao = instituicao.idInstituicao;
	    $scope.editednameInstituicao = instituicao.nomeInstituicao;
	    $scope.editedCidadeInstituicao = instituicao.cidadeInstituicao;
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoEstados();
	};
	$scope.iniciaTela();
});