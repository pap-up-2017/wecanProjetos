angular.module("app").controller('HttpGetEstadoCtrl', function($scope, 
		$http) {
	
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao();");

		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
				.success(function(data) {
					$scope.estado = data["estado"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};
	
	$scope.editrow = function(i){
		$scope.istrue=true;
	    $scope.oldValue = i.idEstado; // save the old id
	    $scope.editedid= i.idEstado;
	    $scope.editedname= i.nomeEstado;
	    console.log(i)
	};
	
	$scope.save=function(estado){
		console.log("função Save();")
	    $scope.istrue=false;
	    $scope.estado.forEach(function (estado) {
	       if(estado.idEstado == $scope.oldValue){
	    	   estado.idEstado = $scope.editedid;
	    	   estado.nomeEstado = $scope.editedname;
	       }
	    });
	};
	
	$scope.closepopup=function(){
	     $scope.istrue=false;

	  }

	

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