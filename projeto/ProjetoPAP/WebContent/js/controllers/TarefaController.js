angular.module("app").controller('PageTarefaCtrl', function($scope, $http) {
	
	// Busca informações de todos as tarefas salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/tarefarest')
				.success(function(data) {
					var tarefasBanco = data["tarefa"];
					var arrayBanco = [];
					if(Array.isArray(tarefasBanco)){
						arrayBanco = tarefasBanco; 
					}
					else{
						arrayBanco.push(tarefasBanco);
					}
					$scope.tarefas = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// Busca informações de todos os projetos salvos no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoProjetos = function() {
		console.log("função buscar informações de projetos");

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest')
				.success(function(data) {
					var projetosBanco = data["projeto"];
					var arrayBanco = [];
					if(Array.isArray(projetosBanco)){
						arrayBanco = projetosBanco; 
					}
					else{
						arrayBanco.push(projetosBanco);
					}
					$scope.projetos = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(tarefa) {
		console.log("Salvar um novo cadastro ...")

		var parameter = JSON.stringify({
			type : "tarefa",
			nomeTarefa : tarefa.nomeTarefa,
			projetoTarefa : tarefa.projetoTarefa,
			descricaoTarefa : tarefa.descricaoTarefa,
			prazoEntrega: tarefa.prazoEntrega
			
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tarefarest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Tarefa salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidTarefa, editednameTarefa, editedProjetoTarefa, editeddescricaoTarefa, editedprazoEntrega ){
		console.log("Salvar uma nova Alteração ...")
		
		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : editedidTarefa,
			nomeTarefa : editednameTarefa,
			projetoTarefa : editedProjetoTarefa,
			descricaoTarefa : editeddescricaoTarefa,
			prazoEntrega: editedprazoEntrega
		});
		
		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tarefarest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Tarefa alterada com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(tarefa){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : tarefa.idTarefa,
			nomeTarefa : tarefa.nomeTarefa,
			projetoTarefa : tarefa.projetoTarefa,
			descricaoTarefa : tarefa.descricaoTarefa,
			prazoEntrega: tarefa.prazoEntrega
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tarefarest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Tarefa excluida com Sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	// TODO fazer carregamento do combobox com o projeto para edição
	$scope.CarregarEdicao = function(tarefa){
		$scope.istrue=true;
	    $scope.editedidTarefa = tarefa.idTarefa;
	    $scope.editednameTarefa = tarefa.nomeTarefa;
	    $scope.editedProjetoTarefa = tarefa.projetoTarefa;
	    $scope.editedProjetoTarefaOld = tarefa.projetoTarefa;
	    $scope.editeddescricaoTarefa = tarefa.descricaoTarefa;
	    $scope.editedprazoEntrega = tarefa.prazoEntrega;
	    console.log(tarefa);
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
		
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoProjetos();
	};
	$scope.iniciaTela();
});