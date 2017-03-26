angular.module("app").controller('PageProjetoCtrl', function($scope, $http) {
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		console.log("função BuscarInformacao..");
		

		$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest')
				.success(function(data) {
					$scope.projetos = data["projeto"];
					console.log(data);
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
	

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(projeto) {
		console.log("Salvar um novo cadastro ...")
		
		var parameter = JSON.stringify({
			type : "projeto",
			nome : projeto.nome,
			descricao : projeto.descricao,
			dataEntrega : projeto.dataEntrega,
			competencias : $scope.competenciasDoProjeto
		});
		
		console.log(parameter);
		
		
		
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
	$scope.SalvarAlteracao = function(editedidProjeto, editednome, editeddescricao, editeddataentrega){
		console.log("Salvar uma nova Alteração ...")
		console.log(editedidProjeto)
		
		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto : editedidProjeto,
			nome : editednome,
			descricao : editeddescricao	,
			dataentrega : editeddataentrega
			
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
	$scope.CarregarEdicao = function(projeto){
		$scope.istrue=true;
	    $scope.editedidProjeto = projeto.idProjeto;
	    $scope.editednome = projeto.nome;
	    $scope.editeddescricao = projeto.descricao;
	    $scope.editeddataentrega = projeto.dataentrega;
	    console.log(projeto);
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