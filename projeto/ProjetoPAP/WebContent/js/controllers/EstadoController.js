angular.module("app").controller('HttpGetEstadoCtrl', function($scope, 
		$http) {
	
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
	
	$scope.editrow = function(estado){
		$scope.istrue=true;
	    $scope.oldValue = estado.idEstado; // save the old id
	    $scope.editedid = estado.idEstado;
	    $scope.editedname = estado.nomeEstado;
	    $scope.editedsigla = estado.siglaEstado;
	    console.log(estado);
	};
	
	$scope.save=function(editedid, editedname, editedsigla){
		console.log("função Save();");	
		
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
				'http://localhost:8080/ProjetoPAP/rest/estadorest/post',
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
		
	$scope.closepopup=function(){
	     $scope.istrue=false;

	  };

	

	$scope.BuscarInformacao();
});

angular.module("app").controller("HttpPostEstadoCtrl", function($scope,
		$http) {

	$scope.EnviarInformacao = function() {
		console.log("função EnviarInformacao();")

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
				'http://localhost:8080/ProjetoPAP/rest/estadorest/post',
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

});