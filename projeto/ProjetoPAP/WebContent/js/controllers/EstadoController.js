angular.module("app").controller('PageEstadoCtrl', function($scope,$http, $rootScope) {
	
	// Busca informações de todos os estados salvos no banco ... Via rest
	$scope.BuscarInformacao = function() {

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
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function() {

		var parameter = JSON.stringify({
			type : "estado",
			nomeEstado : $scope.nomeEstado,
			siglaEstado : $scope.siglaEstado
		});

		$http.post($rootScope.pattern_url+'rest/estadorest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado Salvo com Sucesso!';

				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedid, editedname, editedsigla){
		
		var parameter = JSON.stringify({
			type : "estado",
			idEstado : editedid,
			nomeEstado : editedname,
			siglaEstado : editedsigla
		});

		$http.post($rootScope.pattern_url+'rest/estadorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado Salvo com Sucesso!';

				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(estado){
		$scope.istrue=true;
	    $scope.oldValue = estado.idEstado; // save the old id
	    $scope.editedid = estado.idEstado;
	    $scope.editedname = estado.nomeEstado;
	    $scope.editedsigla = estado.siglaEstado;
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(estado){
		
		var parameter = JSON.stringify({
			type : "estado",
			idEstado : estado.idEstado,
			nomeEstado : estado.nomeEstado,
			siglaEstado : estado.siglaEstado
		});

		$http.post($rootScope.pattern_url+'rest/estadorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado excluido com Sucesso!';
					
					
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
	  
	$scope.BuscarInformacao();
});