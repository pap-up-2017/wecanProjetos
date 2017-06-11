angular.module("app").controller('ItemProjetoCtrl', function($scope, $http, $rootScope) {
	
	// Busca os itens disponiveis ... 
	$scope.BuscarItensDisponiveis = function() {

		$http.get($rootScope.pattern_url+'rest/itemprojetorest')
				.success(function(data) {
					var itensBanco = data["itemAvaliacaoProjeto"];
					var arrayBanco = [];
					if(Array.isArray(itensBanco)){
						arrayBanco = itensBanco; 
					}
					else{
						arrayBanco.push(itensBanco);
					}
					$scope.itensProjeto = arrayBanco;
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	// Busca todos os itens ... 
	$scope.BuscarAllItens = function() {

		$http.get($rootScope.pattern_url+'rest/itemprojetorest/getallitens')
				.success(function(data) {
					var itensBanco = data["itemAvaliacaoProjeto"];
					var arrayBanco = [];
					if(Array.isArray(itensBanco)){
						arrayBanco = itensBanco; 
					}
					else{
						arrayBanco.push(itensBanco);
					}
					$scope.allItensProjeto = arrayBanco;
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	// Salva um item
	$scope.SalvarCadastro = function(item) {

		var parameter = JSON.stringify({
			type : "itemAvaliacaoProjeto",
			nomeItem : item.nomeItem,
			descricaoItem : item.descricaoItem
		});

		$http.post($rootScope.pattern_url+'rest/itemprojetorest/postcad',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Item Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					console.log("Data: " + data + " | status: " + status + " | headers: " + header
							+ " | config: " + config);
				});
		$scope.BuscarAllItens();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedid, editednomeItem, editeddescricaoItem){
		
		var parameter = JSON.stringify({
			type : "curso",
			id : editedid,
			nomeItem : editednomeItem,
			descricaoItem : editeddescricaoItem
		});

		$http.post($rootScope.pattern_url+'rest/itemprojetorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Item Salvo com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					console.log("Data: " + data + " | status: " + status + " | headers: " + header
							+ " | config: " + config);
				});
		$scope.BuscarAllItens();
	};
	
	// desativa um item 
	$scope.DesativarItem = function(item){

		var parameter = JSON.stringify({
			type : "curso",
			id : item.id,
			nomeItem : item.nomeItem,
			descricaoItem : item.descricaoItem
		});

		$http.post($rootScope.pattern_url+'rest/itemprojetorest/desativa',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'item desativado com Sucesso!';
				}).error(
				function(data, status, header, config) {
					console.log("Data: " + data + " | status: " + status + " | headers: " + header
							+ " | config: " + config);
				});
		
		$scope.BuscarAllItens();
	};
	
	// ativa um item 
	$scope.AtivarItem = function(item){

		var parameter = JSON.stringify({
			type : "curso",
			id : item.id,
			nomeItem : item.nomeItem,
			descricaoItem : item.descricaoItem
		});

		$http.post($rootScope.pattern_url+'rest/itemprojetorest/ativa',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'item ativado com Sucesso!';
				}).error(
				function(data, status, header, config) {
					console.log("Data: " + data + " | status: " + status + " | headers: " + header
							+ " | config: " + config);
				});
		$scope.BuscarAllItens();
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(item){
		$scope.istrue=true;
	    $scope.editedid = item.id;
	    $scope.editednomeItem = item.nomeItem;
	    $scope.editeddescricaoItem = item.descricaoItem;
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };

	// função que inicia a tela
	$scope.iniciaTela = function() {
		$scope.BuscarAllItens();
	};
	$scope.iniciaTela();
});