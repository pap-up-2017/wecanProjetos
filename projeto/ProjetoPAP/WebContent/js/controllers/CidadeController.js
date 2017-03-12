angular.module("app").controller('PageCidadeCtrl', function($scope, $http) {
	
	// Busca informações de todos os cidades salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/cidaderest')
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
	
	// Busca informações de todos os estados salvos no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoEstados = function() {
		console.log("função buscar informações de estados");

		$http.get('http://localhost:8080/ProjetoPAP/rest/estadorest')
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
	$scope.SalvarCadastro = function(cidade) {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "cidade",
			nomeCidade : cidade.nomeCidade,
			estadoCidade : cidade.estadoCidade
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/cidaderest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Cidade Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidCidade, editednameCidade, editedEstadoCidade){
		console.log("Salvar uma nova Alteração ...")
		
		var parameter = JSON.stringify({
			type : "cidade",
			idCidade : editedidCidade,
			nomeCidade : editednameCidade,
			estadoCidade : editedEstadoCidade
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/cidaderest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Cidade Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(cidade){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "cidade",
			idCidade : cidade.idCidade,
			nomeCidade : cidade.nomeCidade,
			estadoCidade : cidade.estadoCidade
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/cidaderest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Cidade excluido com Sucesso!';
					
					
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
	$scope.CarregarEdicao = function(cidade){
		$scope.istrue=true;
	    $scope.editedidCidade = cidade.idCidade;
	    $scope.editednameCidade = cidade.nomeCidade;
	    $scope.editedEstadoCidade = cidade.estadoCidade;
	    $scope.editedEstadoCidadeOld = cidade.estadoCidade;
	    console.log(cidade);
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
		
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoEstados();
	};
	$scope.iniciaTela();
});