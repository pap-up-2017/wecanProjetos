angular.module("app").controller('PageDisciplinaCtrl', function($scope, $http, $rootScope) {
	
	// Busca informações de todas as disciplinas salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {

		$http.get($rootScope.pattern_url+'rest/disciplinarest')
				.success(function(data) {
					$scope.disciplinas = data["disciplina"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(disciplina) {

		var parameter = JSON.stringify({
			type : "disciplina",
			nomeDisciplina : disciplina.nomeDisciplina
		});

		$http.post($rootScope.pattern_url+'rest/disciplinarest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Disciplina salva com sucesso!';
					$scope.BuscarInformacao();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidDisciplina, editednomeDisciplina){
		
		var parameter = JSON.stringify({
			type : "disciplina",
			idDisciplina : editedidDisciplina,
			nomeDisciplina : editednomeDisciplina	
		});

		$http.post($rootScope.pattern_url+'rest/disciplinarest/postalt',
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
	$scope.CarregarEdicao = function(disciplina){
		$scope.istrue=true;
	    $scope.editedidDisciplina = disciplina.idDisciplina;
	    $scope.editednomeDisciplina = disciplina.nomeDisciplina;
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(disciplina){

		var parameter = JSON.stringify({
			type : "disciplina",
			idDisciplina : disciplina.idDisciplina,
			nomeDisciplina : disciplina.nomeDisciplina
		});
		
		$http.post($rootScope.pattern_url+'rest/disciplinarest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Disciplina excluida com sucesso!';
					$scope.BuscarInformacao();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		
		
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