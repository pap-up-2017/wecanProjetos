angular.module("app").controller('PageProjetoCtrl', function($scope, $http, $stateParams) {
	
	//console.log($stateParams.idProjeto);
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao dos projetos..");
		

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest')
				.success(function(data) {
					$scope.projetos = data["projeto"];
					//console.log($scope.projetos);
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// Busca informações de todos as competências salvas no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoCompetencias = function() {
		console.log("função buscar informações de competências");

		$http.get('http://localhost:8080/ProjetoPAP/rest/competenciarest')
				.success(function(data) {
					var competenciasBanco = data["competencia"];
					var arrayBanco = [];
					if(Array.isArray(competenciasBanco)){
						arrayBanco = competenciasBanco; 
					}
					else{
						arrayBanco.push(competenciasBanco);
					}
					$scope.competencias = arrayBanco;
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});

	};
	
    $scope.competenciasDoProjeto = [
                    //Inicio a lista competencias do projeto vazia.
                ];
	
   $scope.adicionaCompetencia = function () {
        $scope.competenciasDoProjeto.push({ idCompetencia : $scope.projeto.competencias.idCompetencia,
        	                                nomeCompetencia : $scope.projeto.competencias.nomeCompetencia});
        //console.log($scope.competenciasDoProjeto);
        //console.log($scope.projeto.competencias.nomeCompetencia);
        
    };
	
    // Usuários do projeto
	// Busca informações de todos os usuários salvas no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoUsuarios = function() {
		console.log("função buscar informações de usuários");

		$http.get('http://localhost:8080/ProjetoPAP/rest/usuariorest')
				.success(function(data) {
					var usuariosBanco = data["usuario"];
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
	
    $scope.usuariosDoProjeto = [
                    //Iniciar a lista usuários do projeto vazia.
                ];	
   $scope.adicionaUsuario = function () {
        $scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios.idUsuario,
        	                            nomeUsuario : $scope.projeto.usuarios.nomeUsuario});
    };

    
    
	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(projeto) {
		console.log("Salvar um novo cadastro ...");
		//console.log($scope);
		
		var parameter = JSON.stringify({
			type : "projeto",
			nome : projeto.nome,
			descricao : projeto.descricao,
			organizador : projeto.organizador,
			vagas : projeto.vagas,
			dataEntrega : projeto.dataEntrega,
			competencias : $scope.competenciasDoProjeto,
			usuarios : $scope.usuariosDoProjeto
		});
		
		//console.log(parameter);
		
		
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Projeto salvo com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarInformacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(projeto){
		console.log("Salvar uma nova Alteração ...")
		console.log(projeto)
		
		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto :  projeto.idProjeto,
			nome : projeto.nome,
			descricao : projeto.descricao,
			organizador : projeto.organizador,
			vagas : projeto.vagas,
			dataEntrega : projeto.dataEntrega,
			competencias : $scope.competenciasDoProjeto,
			usuarios : $scope.usuariosDoProjeto
			
		});
		
		console.log(parameter);
		

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Projeto alterado com sucesso!';
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
	$scope.CarregarEdicao = function(){
		console.log("carregando edição");

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest/'+$stateParams.idProjeto)
		.success(function(data) {
			$scope.projeto = data;
			console.log($scope.projeto);
			//Iniciar a lista usuários do projeto com dados do banco.
			
			//console.log(angular.isArray($scope.projeto.usuarios));
			//console.log(angular.isArray($scope.projeto.competencias));
		    if (angular.isArray($scope.projeto.competencias)){
			    $scope.competenciasDoProjeto = [];
			    for (var i = 0; i < $scope.projeto.competencias.length; i++) {
			    	$scope.competenciasDoProjeto.push({ idCompetencia : $scope.projeto.competencias[i].idCompetencia,
			    										nomeCompetencia : $scope.projeto.competencias[i].nomeCompetencia});
			    }
		    }else{
		    	if($scope.projeto.competencias != null){
			    	$scope.competenciasDoProjeto.push({ idCompetencia : $scope.projeto.competencias.idCompetencia,
						nomeCompetencia : $scope.projeto.competencias.nomeCompetencia});
		    	}
				
			}
		    
		    
			if (angular.isArray($scope.projeto.usuarios)){
				$scope.usuariosDoProjeto = [];
			    for (var i = 0; i < $scope.projeto.usuarios.length; i++) {
			    	$scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios[i].idUsuario,
	                    							nomeUsuario : $scope.projeto.usuarios[i].nomeUsuario});
			    }
			}else{
			   	if($scope.projeto.usuarios != null){
			   		$scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios.idUsuario,
			   			nomeUsuario : $scope.projeto.usuarios.nomeUsuario});
			   	}
			}
		
		}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		
		/*
		$scope.istrue=true;
	    $scope.editedidProjeto = projeto.idProjeto;
	    $scope.editednome = projeto.nome;
	    $scope.editeddescricao = projeto.descricao;
	    $scope.editeddataentrega = projeto.dataentrega;
	    //console.log(projeto);
	    */
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(projeto){
		console.log("Excluir um elemento ...")

		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto : projeto.idProjeto,
			nome : projeto.nome,
			descricao : projeto.descricao,
			dataentrega : projeto.dataentrega
			
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Projeto excluido com sucesso!';
					
					
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
			$scope.BuscarInformacaoCompetencias();
			$scope.BuscarInformacaoUsuarios();
			// Validação para não carregar dados no cadastro de novo projetos
			if($stateParams.idProjeto != null){
				$scope.CarregarEdicao();
				
			}
		};
		$scope.iniciaTela();
		
	// função para fechar o popUp de edição ... 
	$scope.DateDbConvert = function(data){
		ano = data.getFullYear(); 
		//console.log(ano)
		mes = data.getMonth()+1;
		//console.log(mes)
		dia = data.getDate();
		//console.log(dia)
		dataDb = ano + "-" + mes + "-" + dia;
		//console.log(dataDb)		
		return dataDb;
	     
	  };
	  

	
});

