angular.module("app").controller('PageCompetenciaCtrl', function($scope, $http, $rootScope) {
	
	// Busca informações de todas as competencias salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {

		$http.get($rootScope.pattern_url+'rest/competenciarest')
				.success(function(data) {
					var competenciasBanco = data["competencia"];
					var arrayBanco = [];
					if(Array.isArray(competenciasBanco)){
						arrayBanco = competenciasBanco; 
					}
					else{
						arrayBanco.push(competenciasBanco);
					}
					$scope.competencias = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(competencia) {

		var parameter = JSON.stringify({
			type : "competencia",
			nomeCompetencia : competencia.nomeCompetencia
		});

		$http.post($rootScope.pattern_url+'rest/competenciarest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Competência salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidCompetencia, editednomeCompetencia){
		
		var parameter = JSON.stringify({
			type : "competencia",
			idCompetencia : editedidCompetencia,
			nomeCompetencia : editednomeCompetencia	
		});

		$http.post($rootScope.pattern_url+'rest/competenciarest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Competência alterada com sucesso!';
					$scope.BuscarInformacao();
					$scope.FecharPopUpEdicao();
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
				
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(competencia){
		$scope.istrue=true;
	    $scope.editedidCompetencia = competencia.idCompetencia;
	    $scope.editednomeCompetencia = competencia.nomeCompetencia;
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(competencia){

		var parameter = JSON.stringify({
			type : "competencia",
			idCompetencia : competencia.idCompetencia,
			nomeCompetencia : competencia.nomeCompetencia
		});

		$http.post($rootScope.pattern_url+'rest/competenciarest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Competencia excluida com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	// função que inicia a tela
		$scope.iniciaTela = function() {
			
			$scope.BuscarInformacao();
		};
		$scope.iniciaTela();
	
});