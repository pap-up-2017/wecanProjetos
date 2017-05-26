angular.module("app").controller('PageAvaliacaoCtrl', function($scope, $http) {
	
	// Busca informações de todas as avaliacoes salvas no banco ... Via rest
	$scope.BuscarInformacaoAvaliacao = function() {
		console.log("função BuscarInformacao Avaliação...");

		$http.get('http://localhost:8080/ProjetoPAP/rest/avaliacaorest')
				.success(function(data) {
					var avaliacoesBanco = data["avaliacao"];
					var arrayBanco = [];
					if(Array.isArray(avaliacoesBanco)){
						arrayBanco = avaliacoesBanco; 
					}
					else{
						arrayBanco.push(avaliacoesBanco);
					}
					$scope.avaliacoes = arrayBanco;
					
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
		
	};
	

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(avaliacao) {
		console.log("Salvar um novo cadastro de avaliação...")

		var parameter = JSON.stringify({
			type : "avaliacao",
			nomeAvaliacao : avaliacao.nomeAvaliacao,
			disciplina : avaliacao.disciplina,
			professor : avaliacao.professor
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/avaliacaorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Avaliacao salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		console.log(avaliacao);
		$scope.BuscarInformacaoAvaliacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidAvaliacao, editednomeAvaliacao){
		console.log("Salvar uma nova Alteração de avaliação ...")
		
		var parameter = JSON.stringify({
			type : "avaliacao",
			idAvaliacao : editedidAvaliacao,
			nomeAvaliacao : editednomeAvaliacao	
		});
		
		

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/avaliacaorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Avaliacao alterada com sucesso!';
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
	$scope.CarregarEdicao = function(avaliacao){
		$scope.istrue=true;
	    $scope.editedidAvaliacao = avaliacao.idAvaliacao;
	    $scope.editednomeAvaliacao = avaliacao.nomeAvaliacao;

	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(avaliacao){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "avaliacao",
			idAvaliacao : avaliacao.idAvaliacao,
			nomeAvaliacao : avaliacao.nomeAvaliacao
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/avaliacaorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Avaliacao excluida com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacaoAvaliacao();
		
	};
	
	// Busca informações de todas as disciplinas salvas no banco ... Via rest
	$scope.BuscarInformacaoDisciplina = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/disciplinarest')
				.success(function(data) {
					$scope.disciplinas = data["disciplina"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// Busca informações de todos os usuários salvas no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoUsuarios = function() {
		console.log("função buscar informações de usuários");

		$http.get('http://localhost:8080/ProjetoPAP/rest/usuariorest')
				.success(function(data) {
					var usuariosBanco = data["usuario"];
					console.log(usuariosBanco);
					var arrayBanco = [];
					if(Array.isArray(usuariosBanco)){
						arrayBanco = usuariosBanco; 
					}
					else{
						arrayBanco.push(usuariosBanco);
					}
					$scope.usuarios = arrayBanco;
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
			console.log("Iniciando a tela de avaliações");
			
			$scope.BuscarInformacaoAvaliacao();
			$scope.BuscarInformacaoDisciplina();
			$scope.BuscarInformacaoUsuarios();
		};
		$scope.iniciaTela();
	
});