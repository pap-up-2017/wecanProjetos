angular.module("app").controller('PageDisciplinaCtrl', function($scope, $http) {
	
	// Busca informações de todas as disciplinas salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
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
	

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(disciplina) {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "disciplina",
			nomeDisciplina : disciplina.nomeDisciplina
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/disciplinarest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Disciplina salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidDisciplina, editednomeDisciplina){
		console.log("Salvar uma nova Alteração ...")
		console.log(editedidDisciplina)
		
		var parameter = JSON.stringify({
			type : "disciplina",
			idDisciplina : editedidDisciplina,
			nomeDisciplina : editednomeDisciplina	
		});
		
		console.log(parameter);
		

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/disciplinarest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Competência alterada com sucesso!';
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
	$scope.CarregarEdicao = function(disciplina){
		$scope.istrue=true;
	    $scope.editedidDisciplina = disciplina.idDisciplina;
	    $scope.editednomeDisciplina = disciplina.nomeDisciplina;
	    console.log(disciplina);
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(disciplina){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "disciplina",
			idDisciplina : disciplina.idDisciplina,
			nomeDisciplina : disciplina.nomeDisciplina
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/disciplinarest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Disciplina excluida com sucesso!';
					
					
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
	// função que inicia a tela
		$scope.iniciaTela = function() {
			console.log("Iniciando a tela");
			
			$scope.BuscarInformacao();
		};
		$scope.iniciaTela();
	
});