angular.module("app").controller('PageProjetoCtrl', function($scope, $rootScope, $http, $stateParams, $cookieStore, $state) {

	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
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

		var parameter = JSON.stringify({
			type : "projeto",
			nome : projeto.nome,
			descricao : projeto.descricao,
			organizador : projeto.organizador,
			vagas : projeto.vagas,
			dataEntrega : projeto.dataEntrega,
			competencias : $scope.competenciasDoProjeto,
			usuarios : $scope.usuariosDoProjeto,
			organizador : {idUsuario : $scope.UsuarioLogado}
			

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
					$state.go("pageMeusProjetos");
				}).error(
				function(data, status, header, config) {
					swal("Não foi possivel criar o projeto, tente novamente.");
				});
		
		$scope.BuscarInformacao();
	};
	
		// inicia projeto
	$scope.StatusProjeto = function(projeto){
		if(projeto.status=="Aberto"){
			IniciarProjeto(projeto);
		}else{
			if(projeto.status == "Em andamento"){
				ConcluirProjeto(projeto);
			}
		}
	}
		
	var IniciarProjeto = function(projeto){

		if($scope.usuariosDoProjeto.length < projeto.vagas){
			swal({
				  title: "Você tem certeza?",
				  text: "O projeto tem apenas "+$scope.usuariosDoProjeto.length+" integrantes, de um total de "
				  	+projeto.vagas+" vagas, deseja continuar?",
				  type: "warning",
				  showCancelButton: true,
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "Sim, tenho certeza.",
				  closeOnConfirm: false
				},
				function(){
					console.log("projeto iniciado");
					$http.post(
							'http://localhost:8080/ProjetoPAP/rest/projetorest/iniciar/'+projeto.idProjeto).success(
							function(data) {
								swal("Muito bem",data,"success");
								$scope.iniciaTela();
							}).error(
							function(data, status, header, config) {
								swal("Ops","Não foi possivel iniciar o projeto, tente novamente.");
						});
				});
			}
		else{
			$http.post(
					'http://localhost:8080/ProjetoPAP/rest/projetorest/iniciar/'+projeto.idProjeto).success(
					function(data) {
						swal("Muito bem",data);
					}).error(
					function(data, status, header, config) {
						swal("Ops","Não foi possivel iniciar o projeto, tente novamente.");
				});
		}		
	}
	
	var ConcluirProjeto = function(projeto){
		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/concluir/'+projeto.idProjeto).success(
				function(data) {
					swal(data);
					$scope.iniciaTela();
				}).error(
				function(data, status, header, config) {
					swal("Ops","Não foi possivel concluir o projeto, tente novamente.");
			});


	}
	
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
			usuarios : $scope.usuariosDoProjeto,
			organizador : {idUsuario : $scope.UsuarioLogado},
			status : projeto.status
			
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
			// Validação para seber se é organizador do projeto
			if($scope.UsuarioLogado == $scope.projeto.organizador.idUsuario ){
				$scope.istrueorganizador=false;
			}else{
				$scope.istrueorganizador=true;
			}
			
			//Iniciar a lista usuários do projeto com dados do banco.
			
			//Validação para exibir um elemento, array de elementos pu não exibir
		    if (angular.isArray($scope.projeto.competencias)){
			    $scope.competenciasDoProjeto = [];
			    for (var i = 0; i < $scope.projeto.competencias.length; i++) {
			    	$scope.competenciasDoProjeto.push({ idCompetencia : $scope.projeto.competencias[i].idCompetencia,
			    										nomeCompetencia : $scope.projeto.competencias[i].nomeCompetencia});
			    }
		    }else{
		    	if($scope.projeto.competencias != null){
		    		$scope.competenciasDoProjeto = [];
			    	$scope.competenciasDoProjeto.push({ idCompetencia : $scope.projeto.competencias.idCompetencia,
						nomeCompetencia : $scope.projeto.competencias.nomeCompetencia});
		    	}
				
			}
		    
		    // Validação para exibir um elemento, array de elementos pu não exibir
			if (angular.isArray($scope.projeto.usuarios)){
				$scope.usuariosDoProjeto = [];
			    for (var i = 0; i < $scope.projeto.usuarios.length; i++) {
			    	$scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios[i].idUsuario,
	                    							nomeUsuario : $scope.projeto.usuarios[i].nomeUsuario});
			    	// Validação para seber se é participante do projeto
					if($scope.UsuarioLogado == $scope.projeto.usuarios[i].idUsuario ){
						$scope.istrueparticipante=false;
					}
			    }
			}else{
			   	if($scope.projeto.usuarios != null){
			   		$scope.usuariosDoProjeto = [];
			   		$scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios.idUsuario,
			   			nomeUsuario : $scope.projeto.usuarios.nomeUsuario});
			   		// Validação para seber se é participante do projeto
					if($scope.UsuarioLogado == $scope.projeto.usuarios.idUsuario ){
						$scope.istrueparticipante=false;
					}
			   	}
			}
			
	//		console.log($scope.projeto.idProjeto)
			$http.get('http://localhost:8080/ProjetoPAP/rest/projetorest/GetAprov/'+$scope.projeto.idProjeto)
			.success(function(data) {
				//$scope.aprovacaoUsuarios = data["aprovacaoParticipante"];
			    // Validação para exibir um elemento, array de elementos para não exibir
				if(data != null){
					$scope.aprovacaoUsuarios = [];
					 if( !angular.isArray(data["aprovacaoParticipante"])){
						
						$scope.aprovacaoUsuarios.push({ id : data["aprovacaoParticipante"].id,
								idUsuario : data["aprovacaoParticipante"].idUsuarioSolicitante.idUsuario,
								nomeUsuario : data["aprovacaoParticipante"].idUsuarioSolicitante.nomeUsuario,
								dataCriacao : data["aprovacaoParticipante"].dataCriacao,
								status : data["aprovacaoParticipante"].status});					
					}else{
						 for (var i = 0; i < data["aprovacaoParticipante"].length; i++) {
							 $scope.aprovacaoUsuarios.push({ id : data["aprovacaoParticipante"][i].id,
									idUsuario : data["aprovacaoParticipante"][i].idUsuarioSolicitante.idUsuario,
									nomeUsuario : data["aprovacaoParticipante"][i].idUsuarioSolicitante.nomeUsuario,
									dataCriacao : data["aprovacaoParticipante"][i].dataCriacao,
									status : data["aprovacaoParticipante"][i].status});
							 		
						    }
					}
				}
			}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
			
		
		}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		
		
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
	
	
	// Solicita participação no projeto
	$scope.SolicitaParticipacao = function(projeto){
		console.log("Solicita para entrar no projetos ...")
		console.log($scope.UsuarioLogado+'/'+$stateParams.idProjeto);
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/solAprov/'+$scope.UsuarioLogado+'/'+$stateParams.idProjeto,
				null, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Soliciação realizada com sucesso!';
					console.log('antes da notificação');
					
					// Gera notificação de participante
					$scope.notificacao = {
							type : "notificacao",
							tituloNotificacao : 'Solicitação de participante' ,
							textoNotificacao : 'o usuário '+ $scope.UsuarioLogado + ' solicitou participação no projeto '+ $scope.projeto.nome,
							linkAcessoNotificacao : 'pageDetalhesProjeto({idProjeto:' + $scope.projeto.idProjeto +'})',
							usuario : $scope.projeto.organizador.idUsuario }
					
					$rootScope.InserirNotificacao($scope.notificacao);
					$scope.iniciaTela();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
	};
	
	
	// Aceitar participante no projeto
	$scope.AceitarParticipante = function(aprovacaoUsuario){
		console.log("Dono do projeto aceita participante ...")
		console.log(aprovacaoUsuario.id)
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}
		
		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/Aceitar/'+aprovacaoUsuario.id,
				null, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Aprovação realizada com sucesso!';
					// Gera notificação de aprovação
					$scope.notificacao = {
							type : "notificacao",
							tituloNotificacao : 'Aprovação no projeto' ,
							textoNotificacao : 'Você foi aprovado no projeto '+ $scope.projeto.nome,
							linkAcessoNotificacao : 'pageDetalhesProjeto({idProjeto:' + $scope.projeto.idProjeto +'})',
							usuario : aprovacaoUsuario.idUsuario }
					
					$rootScope.InserirNotificacao($scope.notificacao);
					$scope.iniciaTela();
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
	};
	
	// Recusar participante no projeto
	$scope.RecusarParticipante = function(aprovacaoUsuario){
		console.log("Dono do projeto recusa participante ...")
		//console.log(aprovacaoUsuario.id)
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}
		
		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/projetorest/Recusar/'+aprovacaoUsuario.id,
				null, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Recusa realizada com sucesso!';
					// Gera notificação de recusa
					$scope.notificacao = {
							type : "notificacao",
							tituloNotificacao : 'Recusa no projeto' ,
							textoNotificacao : 'Não foi aprovada sua participação no projeto '+ $scope.projeto.nome,
							linkAcessoNotificacao : 'pageDetalhesProjeto({idProjeto:' + $scope.projeto.idProjeto +'})',
							usuario : aprovacaoUsuario.idUsuario }
					
					$rootScope.InserirNotificacao($scope.notificacao);
					$scope.iniciaTela();
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
	
	$scope.modificarStatusProjeto = function(projeto){
		if(projeto != null){
			if(projeto.status == "Aberto"){	
				return "Iniciar projeto";
			}
			else{
				if(projeto.status == "Em andamento"){
					return "Concluir projeto";
				}
			}
		}
	}	
	
	$scope.filtroTela = function(idOrganizador, usuariosDoProjetoo, aprovacaoUsuarioss){
		if(idOrganizador == $scope.UsuarioLogado){
			return false;
		}
		for (i = 0; i < usuariosDoProjetoo.length; i++) {
		   if(usuariosDoProjetoo[i].idUsuario == $scope.UsuarioLogado){
			   return false;
		   }
		}
		if(aprovacaoUsuarioss != null){
			for (i = 0; i < aprovacaoUsuarioss.length; i++) {
				if(aprovacaoUsuarioss[i].idUsuario == $scope.UsuarioLogado){
					return false;
				}
			}
		}
		return true;
	}
		
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
	  
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela projetos");
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoCompetencias();
		$scope.BuscarInformacaoUsuarios();
		$scope.modificarStatusProjeto();
		// Validação para não carregar dados no cadastro de novo projetos
		if($stateParams.idProjeto != null){
			$scope.CarregarEdicao();
			$rootScope.projeto_selecionado_id = $stateParams.idProjeto;			
		}			
	};
	$scope.iniciaTela();
	
});

