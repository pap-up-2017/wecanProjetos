angular.module("app").controller('PageTarefaCtrl', function($scope, $http, $stateParams) {
	
	$scope.drag = function(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
		ev.dataTransfer.setData("valida", true);
		//console.log('Teste');
	};
	
	$scope.allowDrop = function (ev) {
	    ev.preventDefault();
	    if (ev.target.getAttribute("draggable") == "true" || ev.toElement.id == ''){
	        ev.dataTransfer.dropEffect = "none"; // dropping is not allowed
	    }else{
	        ev.dataTransfer.dropEffect = "all"; // drop it like it's hot
	    }
	};
	
	$scope.drop = function (ev) {
	    ev.preventDefault();
	    if(ev.dataTransfer.getData("text") != null && ev.dataTransfer.getData("valida") != ''){
		    var data = ev.dataTransfer.getData("text");
		    //ev.target.appendChild(document.getElementById(data));	   
		    //console.log(ev.target);
		    // Precisou criar um id unico para a div do repeat para levar ela toda e não dar erro na alteração da tarefa
		    ev.target.append(document.getElementById(data+'rep'));
		    
		    // Pega o id da tarefa
		    //console.log( "Id da tarefa: " + ev.dataTransfer.getData("text"));
		    //$scope.editedIdTarefa = ev.dataTransfer.getData("text"); 
		    $scope.editedIdTarefa = ev.dataTransfer.getData("text");
		    //Pega o novo status da tarefa
		    //console.log( "Novo status da tarefa: " + ev.target.id);
		    $scope.editedStatusTarefa = ev.target.id;
		    
		    $scope.AtualizaStatus($scope.editedIdTarefa,$scope.editedStatusTarefa);
	    }
	    
	};
	
	// Busca informações de um projeto especifico ... Via rest
	$scope.BuscarTarefaProjeto = function() {
		console.log("função tarefas do projeto atual..");

		$http.get('http://localhost:8080/ProjetoPAP/rest/tarefarest/proj/'+$stateParams.idProjeto)
				.success(function(data) {
					if(data != null){
						var tarefasBanco = data["tarefa"];
						var arrayBanco = [];
						if(Array.isArray(tarefasBanco)){
							arrayBanco = tarefasBanco; 
						}
						else{
							arrayBanco.push(tarefasBanco);
						}
						$scope.tarefas = arrayBanco;
					}
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
			projetoTarefa : { idProjeto: $stateParams.idProjeto},
			descricaoTarefa : tarefa.descricaoTarefa,
			prazoEntrega: tarefa.prazoEntrega,
			statusTarefa : 'Pendente'
			
		});
		
		tarefa.nomeTarefa = '';
		tarefa.descricaoTarefa = '';
		tarefa.prazoEntrega = '';

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
					$scope.BuscarTarefaProjeto();
					$scope.FecharPopUpCriacao();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});

		//$scope.BuscarInformacao();
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
					$scope.BuscarTarefaProjeto();
					$scope.FecharPopUpEdicao();
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		//$scope.BuscarInformacao();
		
	};
	

	
	// Atualiza status da tarefa
	$scope.AtualizaStatus = function(editedidTarefa, editedStatusTarefa ){
		console.log("Atualiza Status ...")
		
		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : editedidTarefa,
			statusTarefa : editedStatusTarefa
			//nomeTarefa : editednameTarefa,
			//projetoTarefa : editedProjetoTarefa,
			//descricaoTarefa : editeddescricaoTarefa,
			//prazoEntrega: editedprazoEntrega
		});
		
//		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/tarefarest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = data;
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		//$scope.BuscarInformacao();
		
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
					$scope.BuscarTarefaProjeto();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		//$scope.BuscarInformacao();
		
	};
	
	$scope.CriarTarefa = function(){
		$scope.createIstrue=true;
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(tarefa){
		$scope.editIstrue=true;
	    $scope.editedidTarefa = tarefa.idTarefa;
	    $scope.editednameTarefa = tarefa.nomeTarefa;
	    $scope.editedProjetoTarefa = tarefa.projetoTarefa;
	    $scope.editedProjetoTarefaOld = tarefa.projetoTarefa;
	    $scope.editeddescricaoTarefa = tarefa.descricaoTarefa;
	    $scope.editedprazoEntrega = new Date(tarefa.prazoEntrega);
	    //console.log(tarefa);
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.editIstrue=false;
	  };
	  
	// função para fechar o popUp de criação ... 
	$scope.FecharPopUpCriacao = function(){
	     $scope.createIstrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
		
		$scope.BuscarTarefaProjeto();
		//$scope.BuscarInformacaoProjetos();
	};
	$scope.iniciaTela();
	
	/*
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
	*/

	
});