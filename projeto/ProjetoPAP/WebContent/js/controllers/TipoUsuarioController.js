angular.module("app").controller('PageTipoUsuarioCtrl', function($scope, $http, $rootScope) {
	
	// Busca informações no banco .. via rest
	$scope.BuscarInformacao = function() {

		$http.get($rootScope.pattern_url+'rest/tipousuariorest')
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

		var parameter = JSON.stringify({
			type : "tipoUsuario",
			tipoUsuario : tipoUsuario.tipoUsuario
		});

		$http.post($rootScope.pattern_url+'rest/tipousuariorest/postcad',
				parameter, $rootScope.GetPostconfig).success(
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
		
		var parameter = JSON.stringify({
			type : "tipoUsuario",
			idTipoUsuario : editedidTipoUsuario,
			tipoUsuario : editedTipoUsuario,
		});

		$http.post($rootScope.pattern_url+'rest/tipousuariorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
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
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(tipoUsuario){

		var parameter = JSON.stringify({
			type : "tipoUsuario",
			idTipoUsuario : tipoUsuario.idTipoUsuario,
			tipoUsuario : tipoUsuario.tipoUsuario,
		});

		$http.post($rootScope.pattern_url+'rest/tipousuariorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
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