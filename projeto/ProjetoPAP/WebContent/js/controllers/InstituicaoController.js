angular.module("app").controller('PageInstituicaoCtrl', function($scope, $http) {
	
	// Busca informações de todos os cidades salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/instituicaorest')
				.success(function(data) {
					$scope.instituicoes = data["instituicaoEnsino"];
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
					$scope.estados = data["estado"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};

	// Busca informações de todos os cidades salvas no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoCidades = function() {
		console.log("função BuscarInformacao cidades ...");

		$http.get('http://localhost:8080/ProjetoPAP/rest/cidaderest')
				.success(function(data) {
					$scope.cidades = data["cidade"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

		console.log($scope.cidades);
	};
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(instituicao) {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			nomeInstituicao : instituicao.nomeInstituicao,
			cidadeInstituicao : instituicao.cidadeInstituicao
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/instituicaorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidInstituicao, editednameInstituicao, editedCidadeInstituicao){
		console.log("Salvar uma nova Alteração ...")
		// TODO arrumar carregamento automatico do dropDownlist..
		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			idInstituicao : editedidInstituicao,
			nomeInstituicao : editednameInstituicao,
			cidadeInstituicao : editedCidadeInstituicao
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/instituicaorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao Salva com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(instituicao){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "instituicaoEnsino",
			idInstituicao : instituicao.idInstituicao,
			nomeInstituicao : instituicao.nomeInstituicao,
			cidadeInstituicao : instituicao.cidadeInstituicao
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/instituicaorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Instituicao excluido com Sucesso!';
					
					
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
	$scope.CarregarEdicao = function(instituicao){
		$scope.istrue=true;
	    $scope.editedidInstituicao = instituicao.idInstituicao;
	    $scope.editednameInstituicao = instituicao.nomeInstituicao;
	    $scope.editedCidadeInstituicao = instituicao.cidadeInstituicao;
	    console.log(instituicao);
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