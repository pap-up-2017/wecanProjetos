angular.module("app").controller('PageTarefaCtrl', function($scope, $http, $stateParams, $cookieStore, $filter, $rootScope ) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	$scope.drag = function(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
		ev.dataTransfer.setData("valida", true);
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
		$http.get($rootScope.pattern_url+'rest/tarefarest/proj/'+$stateParams.idProjeto)
				.success(function(data) {
					if(data != null){
						$rootScope.tarefas = null;
						var tarefasBanco = data["tarefa"];
						var arrayBanco = [];
						if(Array.isArray(tarefasBanco)){
							arrayBanco = tarefasBanco; 
						}
						else{
							arrayBanco.push(tarefasBanco);
						}
						$rootScope.tarefas = arrayBanco;
					}
				}).error(
						function(data, status, header, config) {
							$rootScope.tarefas = null;
						});
	};
	
	
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(tarefa) {

		var parameter = JSON.stringify({
			type : "tarefa",
			nomeTarefa : tarefa.nomeTarefa,
			projetoTarefa : { idProjeto: $stateParams.idProjeto},
			descricaoTarefa : tarefa.descricaoTarefa,
			prazoEntrega: tarefa.prazoEntrega,
			responsavel : tarefa.responsavel,
			statusTarefa : 'Pendente'
			
		});
		
		tarefa.nomeTarefa = '';
		tarefa.descricaoTarefa = '';
		tarefa.prazoEntrega = '';
		
		$http.post($rootScope.pattern_url+'rest/tarefarest/postcad/'+$scope.UsuarioLogado,
				parameter, $rootScope.GetPostconfig).success(
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
	$scope.SalvarAlteracao = function(editedidTarefa, editednameTarefa, editedProjetoTarefa, editeddescricaoTarefa, editedprazoEntrega, editedresponsavel, editedStatusTarefa ){
		
		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : editedidTarefa,
			nomeTarefa : editednameTarefa,
			projetoTarefa : editedProjetoTarefa,
			descricaoTarefa : editeddescricaoTarefa,
			prazoEntrega: editedprazoEntrega,
			responsavel : editedresponsavel,
			statusTarefa : editedStatusTarefa.status
			
		});
		
		console.log(editedStatusTarefa.status);
		console.log(parameter);

		$http.post($rootScope.pattern_url+'rest/tarefarest/postalt/'+$scope.UsuarioLogado,
				parameter, $rootScope.GetPostconfig).success(
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
		
		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : editedidTarefa,
			statusTarefa : editedStatusTarefa
		});

		$http.post($rootScope.pattern_url+'rest/tarefarest/postalt/'+$scope.UsuarioLogado,
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = data;	
					$scope.BuscarTarefaProjeto();	
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;	
				});
	};

	
	
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(tarefa){

		var parameter = JSON.stringify({
			type : "tarefa",
			idTarefa : tarefa.idTarefa,
			nomeTarefa : tarefa.nomeTarefa,
			projetoTarefa : tarefa.projetoTarefa,
			descricaoTarefa : tarefa.descricaoTarefa,
			prazoEntrega: tarefa.prazoEntrega
		});

		$http.post($rootScope.pattern_url+'rest/tarefarest/postdel',
				parameter, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Tarefa excluida com Sucesso!';
					$scope.BuscarTarefaProjeto();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});	
		$scope.BuscarTarefaProjeto();
	};
	
	$scope.CriarTarefa = function(){
		$scope.createIstrue=true;
	};
	
	$scope.DetalhesTarefa = function(tarefa){
		var d = new Date();
		swal({
			  title: tarefa.nomeTarefa,
			  text: '<p style="word-wrap: break-word;">' + tarefa.descricaoTarefa+"<br/>"+
			  		"Criado em: "+ $filter('date')(tarefa.dataCriacao, 'dd/MM/yyyy - HH:mm:ss')+"<br/>"+
			  		"Prazo: "+ $filter('date')(tarefa.prazoEntrega, 'dd/MM/yyyy')+"<br/>"+
			  		"Status: "+tarefa.statusTarefa+"<br/>"+
			  		"Responsavel: "+tarefa.responsavel.usernameUsuario+"<br/>"+
			  		"Responsavel pela ultima modificação: "+tarefa.usuarioModificacao.usernameUsuario+ '</p>'
				  ,
			  html: true
			});
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(tarefa){
		
		$scope.StatusTarefaArr = [];
		$scope.StatusTarefaArr.push({ status : 'Pendente'});
		$scope.StatusTarefaArr.push({ status : 'Em Andamento'});
		$scope.StatusTarefaArr.push({ status : 'Concluído'});
		
		$scope.editIstrue=true;
	    $scope.editedidTarefa = tarefa.idTarefa;
	    $scope.editednameTarefa = tarefa.nomeTarefa;
	    $scope.editedProjetoTarefa = tarefa.projetoTarefa;
	    $scope.editedProjetoTarefaOld = tarefa.projetoTarefa;
	    $scope.editeddescricaoTarefa = tarefa.descricaoTarefa;
	    $scope.editedresponsavel = tarefa.responsavel;
	    $scope.editedStatusTarefa = tarefa.statusTarefa;
	    $scope.editedprazoEntrega = new Date(tarefa.prazoEntrega);
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
		
		$scope.BuscarTarefaProjeto();
		//$scope.BuscarInformacaoProjetos();
	};
	$scope.iniciaTela();
	
	// Busca informações de todos as tarefas salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {

		$http.get($rootScope.pattern_url+'rest/tarefarest')
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

		$http.get($rootScope.pattern_url+'rest/projetorest')
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

	
});