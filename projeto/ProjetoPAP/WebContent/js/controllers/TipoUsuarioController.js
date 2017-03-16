angular.module("app").controller('PageTipoUsuarioCtrl', function($scope, 
		$http) {
	
	// Busca informações no banco .. via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao();");

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
					$scope.tipousuarios = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};
	
	// envia a informação de um novo cadastro no banco ... Via rest
	$scope.SalvarCadastro = function(tipoUsuario) {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "tipoUsuario",
			tipoUsuario : tipoUsuario.tipoUsuario
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tipousuariorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Tipo de Usuario Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidTipoUsuario, editedTipoUsuario){
		console.log("Salvar uma nova Alteração ...")
		
		var parameter = JSON.stringify({
			type : "tipoUsuario",
			idTipoUsuario : editedidTipoUsuario,
			tipoUsuario : editedTipoUsuario,
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tipousuariorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'TipoUsuario salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(tipoUsuario){
		$scope.istrue=true;
	    $scope.oldValue = tipoUsuario.idTipoUsuario; // save the old id
	    $scope.editedidTipoUsuario = tipoUsuario.idTipoUsuario;
	    $scope.editedTipoUsuario = tipoUsuario.tipoUsuario;
	    console.log(tipoUsuario);
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(tipoUsuario){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "tipoUsuario",
			idTipoUsuario : tipoUsuario.idTipoUsuario,
			tipoUsuario : tipoUsuario.tipoUsuario,
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tipousuariorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'TipoUsuario excluido com Sucesso!';
					
					
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