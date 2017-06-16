angular.module("app").controller('PageProjetoCtrl', function($scope, $rootScope, $http, $stateParams, $cookieStore, $state, $rootScope) {

	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	$scope.usernameUsuarioLogado = $cookieStore.get("session_username");
	
	// Busca informações de todos os projetos salvas no banco ... Via rest
	$scope.BuscarInformacao = function() {
		
		$http.get($rootScope.pattern_url+'rest/projetorest')
				.success(function(data) {
					$scope.projetos = data["projeto"];
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

		$http.get($rootScope.pattern_url+'rest/competenciarest')
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
        
    };
	
    // Usuários do projeto
	// Busca informações de todos os usuários salvas no banco ... Via rest
	// para carregar o comboBox..
	$scope.BuscarInformacaoUsuarios = function() {

		$http.get($rootScope.pattern_url+'rest/usuariorest')
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
    
    $scope.orientadoresDoProjeto = [
                                //Iniciar a lista usuários do projeto vazia.
                            ];	
   $scope.adicionaUsuario = function () {
        $scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios.idUsuario,
        	                            nomeUsuario : $scope.projeto.usuarios.nomeUsuario});
    };
    
    $scope.adicionaOrientador = function () {
        $scope.orientadoresDoProjeto.push({ idUsuario : $scope.projeto.orientador.idUsuario,
        	                            nomeUsuario : $scope.projeto.orientador.nomeUsuario});
    };

	// envia a informação de um novo cadastro de para o banco ... Via rest
	$scope.SalvarCadastro = function(projeto) {
		if (typeof projeto != 'undefined'){
			if(projeto.nome != null){
				if(projeto.descricao != null){
					if(projeto.dataEntrega != null){
						if(projeto.vagas != null){
							if($scope.competenciasDoProjeto.length > 0){
								var parameter = JSON.stringify({
									type : "projeto",
									nome : projeto.nome,
									descricao : projeto.descricao,
									organizador : projeto.organizador,
									vagas : projeto.vagas,
									dataEntrega : projeto.dataEntrega,
									competencias : $scope.competenciasDoProjeto,
									usuarios : $scope.usuariosDoProjeto.concat($scope.orientadoresDoProjeto),
									tipoProjeto : $scope.tipoProjeto,
									organizador : {idUsuario : $scope.UsuarioLogado}
								});
								
								console.log(parameter);
								$http.post($rootScope.pattern_url+'rest/projetorest/postcad',
										parameter, $rootScope.GetPostconfig).success(
										function(data, status, headers, config) {
											$state.go("pageMeusProjetos");
										}).error(
										function(data, status, header, config) {
											swal("Não foi possivel criar o projeto, tente novamente.");
										});
							}else{
								swal("você deve inserir ao menos uma competencia em seu projeto.");
							}
						}else{
							swal("Preencha as quantidade de vagas do projeto.")
						}
					}else{
						swal("Preencha a data de entrega do projeto.")
					}
				}else{
					swal("Preencha a descrição do projeto.")
				}
			}else{
				swal("Preencha o nome do projeto.");
			}
		}else{
			swal("Preencha os dados do projeto.");
		}
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
					$http.post($rootScope.pattern_url+'rest/projetorest/iniciar/'+projeto.idProjeto).success(
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
			$http.post($rootScope.pattern_url+'rest/projetorest/iniciar/'+projeto.idProjeto).success(
					function(data) {
						swal("Muito bem",data,"success");
						$scope.iniciaTela();
					}).error(
					function(data, status, header, config) {
						swal("Ops","Não foi possivel iniciar o projeto, tente novamente.");
				});
		}		
	}
	
	var ConcluirProjeto = function(projeto){
		$http.post($rootScope.pattern_url+'rest/projetorest/concluir/'+projeto.idProjeto).success(
				function(data) {
					swal(data);
					$scope.iniciaTela();
					carregaTarefas(projeto.idProjeto);
				}).error(
				function(data, status, header, config) {
					swal("Ops","Não foi possivel concluir o projeto, tente novamente.");
			});


	}
	
	var carregaTarefas = function(idprojeto){
		$http.get($rootScope.pattern_url+'rest/tarefarest/proj/'+idprojeto)
		.success(function(data) {
			$rootScope.tarefas = null;
			if(data != null){
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
	}
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(projeto){
		
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

		$http.post($rootScope.pattern_url+'rest/projetorest/postalt',
				parameter, $rootScope.GetPostconfig).success(
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
		$http.get($rootScope.pattern_url+'rest/projetorest/'+$stateParams.idProjeto)
		.success(function(data) {
			$scope.projeto = data;
			carregaTarefas($scope.projeto.idProjeto);
			// Validação para seber se é organizador do projeto
			if($scope.UsuarioLogado == $scope.projeto.organizador.idUsuario ){
				$scope.istrueorganizador=false;
			}else{
				$scope.istrueorganizador=true;
			}
			
			carregaTarefas($scope.projeto.idProjeto);
			
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
	                    							nomeUsuario : $scope.projeto.usuarios[i].nomeUsuario,
	                    							tipoUsuario :  $scope.projeto.usuarios[i].tipoUsuario});
			    	// Validação para seber se é participante do projeto
					if($scope.UsuarioLogado == $scope.projeto.usuarios[i].idUsuario ){
						$scope.istrueparticipante=false;
					}
			    }
			    $scope.usuariosSelect = [];
			    for(var i = 0; i < $scope.usuariosDoProjeto.length; i++){
			    	 $scope.usuariosSelect.push({idUsuario : $scope.usuariosDoProjeto[i].idUsuario,
	                    							nomeUsuario : $scope.usuariosDoProjeto[i].nomeUsuario,
	                    							tipoUsuario :  $scope.usuariosDoProjeto[i].tipoUsuario});
			    		 
			    }
			    $scope.usuariosSelect.push({ idUsuario : $scope.projeto.organizador.idUsuario,
	                    							nomeUsuario : $scope.projeto.organizador.nomeUsuario,
	                    							tipoUsuario :  $scope.projeto.organizador.tipoUsuario});
			}else{
			   	if($scope.projeto.usuarios != null){
			   		$scope.usuariosDoProjeto = [];
			   		$scope.usuariosDoProjeto.push({ idUsuario : $scope.projeto.usuarios.idUsuario,
			   										nomeUsuario : $scope.projeto.usuarios.nomeUsuario, 
			   										tipoUsuario :  $scope.projeto.usuarios.tipoUsuario
			   										});
			   		// Validação para seber se é participante do projeto
					if($scope.UsuarioLogado == $scope.projeto.usuarios.idUsuario ){
						$scope.istrueparticipante=false;
					}
			   	}
			   	$scope.usuariosSelect = [];
			    for(var i = 0; i < $scope.usuariosDoProjeto.length; i++){
			    	 $scope.usuariosSelect.push({idUsuario : $scope.usuariosDoProjeto[i].idUsuario,
	                    							nomeUsuario : $scope.usuariosDoProjeto[i].nomeUsuario,
	                    							tipoUsuario :  $scope.usuariosDoProjeto[i].tipoUsuario});
			    		 
			    }
			    $scope.usuariosSelect.push({ idUsuario : $scope.projeto.organizador.idUsuario,
	                    							nomeUsuario : $scope.projeto.organizador.nomeUsuario,
	                    							tipoUsuario :  $scope.projeto.organizador.tipoUsuario});
			}
			console.log($scope.usuariosDoProjeto);
			
			$http.get($rootScope.pattern_url+'rest/projetorest/GetAprov/'+$scope.projeto.idProjeto)
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

		var parameter = JSON.stringify({
			type : "projeto",
			idProjeto : projeto.idProjeto,
			nome : projeto.nome,
			descricao : projeto.descricao,
			dataentrega : projeto.dataentrega
			
		});

		$http.post($rootScope.pattern_url+'rest/projetorest/postdel',
				parameter, $rootScope.GetPostconfig).success(
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

		$http.post($rootScope.pattern_url+'rest/projetorest/solAprov/'+$scope.UsuarioLogado+'/'+$stateParams.idProjeto,
				null, $rootScope.GetPostconfig).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Soliciação realizada com sucesso!';
					
					// Gera notificação de participante
					$scope.notificacao = {
							type : "notificacao",
							tituloNotificacao : 'Solicitação de participante' ,
							textoNotificacao : 'o usuário '+$scope.usernameUsuarioLogado+' solicitou participação no projeto '+ $scope.projeto.nome,
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
		
		$http.post($rootScope.pattern_url+'rest/projetorest/Aceitar/'+aprovacaoUsuario.id,
				null, $rootScope.GetPostconfig).success(
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
		
		$http.post($rootScope.pattern_url+'rest/projetorest/Recusar/'+aprovacaoUsuario.id,
				null, $rootScope.GetPostconfig).success(
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
					return "Finalizar projeto";
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
	
	$scope.filtroBloqueioProjetoEmAndamento = function(usuariosDoProjetoo, idOrganizadorr, statuss){
		if(statuss == "Em andamento"){
			if(idOrganizadorr == $scope.UsuarioLogado){
				return true;
			}
			for (i = 0; i < usuariosDoProjetoo.length; i++) {
			   if(usuariosDoProjetoo[i].idUsuario == $scope.UsuarioLogado){
				   return true;
			   }
			}
			return false;
		}
		else{	
			return true;
		}
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
	  
	$scope.ApagarCompetenciaDoprojetoACriar = function(competenciaDoProjeto){
		for(var i=0; i<=$scope.competenciasDoProjeto.length; i++) {
		    if($scope.competenciasDoProjeto[i].idCompetencia == competenciaDoProjeto.idCompetencia){
		    	if(i == 0){
		    		$scope.competenciasDoProjeto.shift();
		    	}else{
			    	$scope.competenciasDoProjeto.splice(i,i);
		    	}
		    	break;
		    }
		}
	}
	
	$scope.ApagarUsuariosDoprojetoACriar = function(usuarioDoProjeto){
		for(var i=0; i<=$scope.usuariosDoProjeto.length; i++) {
		    if($scope.usuariosDoProjeto[i].idUsuario == usuarioDoProjeto.idUsuario){
		    	if(i == 0){
		    		$scope.usuariosDoProjeto.shift();
		    	}else{
		    		$scope.usuariosDoProjeto.splice(i,i);
		    	}
		    	break;
		    }
		}
	}
	
	$scope.ApagarOrientadoresDoprojetoACriar = function(orientadorDoProjeto){
		for(var i=0; i<=$scope.orientadoresDoProjeto.length; i++) {
		    if($scope.orientadoresDoProjeto[i].idUsuario == orientadorDoProjeto.idUsuario){
		    	if(i == 0){
		    		$scope.orientadoresDoProjeto.shift();
		    	}else{
		    		$scope.orientadoresDoProjeto.splice(i,i);
		    	}
		    	break;
		    }
		}
	}
	
	$scope.habilitarTCC = function(){
		console.log($scope.projetoDeTCC);
		if($scope.projetoDeTCC){
			$scope.tipoProjeto = "TCC"
			console.log($scope.tipoProjeto);
		}
		else{
			$scope.tipoProjeto = "Comum"
			console.log($scope.tipoProjeto);
		}
	}
	
	$scope.filtroProfessor = function(usuario){
		if(typeof usuario != 'undefined'){
			if(usuario.tipoUsuario.tipoUsuario == "Professor"){
				return true;
			}
		}
		return false;
	}
	
	$scope.filtroAluno = function(usuario){
		if(typeof usuario != 'undefined'){
			if(usuario.tipoUsuario.tipoUsuario == "Aluno"){
				return true;
			}
		}
		return false;
	}
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		$scope.BuscarInformacao();
		$scope.BuscarInformacaoCompetencias();
		$scope.BuscarInformacaoUsuarios();
		$scope.modificarStatusProjeto();
		$scope.tipoProjeto = "Comum";
		// Validação para não carregar dados no cadastro de novo projetos
		if($stateParams.idProjeto != null){
			$scope.CarregarEdicao();
			$rootScope.projeto_selecionado_id = $stateParams.idProjeto;			
		}			
	};
	$scope.iniciaTela();
});