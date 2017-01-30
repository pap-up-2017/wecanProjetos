angular.module("app").controller('PageEstadoCtrl', function($scope, 
		$http) {
	
	// Busca informações de todos os estados salvos no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao();");

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
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function() {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "estado",
			nomeEstado : $scope.nomeEstado,
			siglaEstado : $scope.siglaEstado
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/estadorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedid, editedname, editedsigla){
		console.log("Salvar uma nova Alteração ...")
		
		var parameter = JSON.stringify({
			type : "estado",
			idEstado : editedid,
			nomeEstado : editedname,
			siglaEstado : editedsigla
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/estadorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Estado Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(estado){
		$scope.istrue=true;
	    $scope.oldValue = estado.idEstado; // save the old id
	    $scope.editedid = estado.idEstado;
	    $scope.editedname = estado.nomeEstado;
	    $scope.editedsigla = estado.siglaEstado;
	    console.log(estado);
	};
		
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	  
	$scope.BuscarInformacao();
});