angular.module("app").controller('PageAvaliacaoCtrl', function($scope, $http, $rootScope, $stateParams, $cookieStore) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca informações de todas as avaliacoes salvas no banco ... Via rest
	$scope.BuscarInformacaoAvaliacao = function() {
		
		$http.get($rootScope.pattern_url+'rest/avaliacaorest')
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
				$rootScope.pattern_url+'rest/avaliacaorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Avaliacao salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		$scope.BuscarInformacaoAvaliacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidAvaliacao, editednomeAvaliacao){
	
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
				$rootScope.pattern_url+'rest/avaliacaorest/postalt',
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
				$rootScope.pattern_url+'rest/avaliacaorest/postdel',
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

		$http.get($rootScope.pattern_url+'rest/disciplinarest')
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
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	  
	
	//*********** Exercícios ***************//
		
	  // Busca informações de todas as avaliacoes salvas no banco ... Via rest
		$scope.BuscarInformacaoExercicio = function() {

			$http.get($rootScope.pattern_url+'rest/exerciciorest')
					.success(function(data) {
						var exerciciosBanco = data["exercicio"];
						var arrayBancoExercicios = [];
						if(Array.isArray(exerciciosBanco)){
							arrayBancoExercicios = exerciciosBanco; 
						}
						else{
							arrayBancoExercicios.push(exerciciosBanco);
						}
						$scope.exercicios = arrayBancoExercicios;
						
					}).error(
							function(data, status, header, config) {
								$scope.Resposta = "Data: " + data + "<hr />status: "
										+ status + "<hr />headers: " + header
										+ "<hr />config: " + config;
							});
			
		};	  
	  
		// envia a informação de um novo cadastro de para o banco ... Via rest
		$scope.SalvarCadastroExercicio = function(exercicio) {

			var parameter = JSON.stringify({
				type : "exercicio",
				tituloExercicio : exercicio.tituloExercicio,
				descricaoExercicio : exercicio.descricaoExercicio,
				avaliacao : exercicio.avaliacao
			});
			
			var config = {
				headers : {
					'Content-Type' : 'application/json;charset=utf-8;'
				}
			}

			$http.post(
					$rootScope.pattern_url+'rest/exerciciorest/postcad',
					parameter, config).success(
					function(data, status, headers, config) {
						$scope.RespostaExercicio = 'Exercício salvo com sucesso!';
						$scope.BuscarInformacaoExercicio();						
						
					}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
		};
		
		// Envia a informação de alteração de um elemento para o banco ... Via rest
		$scope.SalvarAlteracaoExercicio = function(editedidExercicio, editedtituloExercicio, editeddescricaoExercicio){
		
			var parameter = JSON.stringify({
				type : "exercicio",
				idExercicio : editedidExercicio,
				tituloExercicio : editedtituloExercicio,
				descricaoExercicio : editeddescricaoExercicio
			});
			
			

			var config = {
				headers : {
					'Content-Type' : 'application/json;charset=utf-8;'
				}
			}

			$http.post(
					$rootScope.pattern_url+'rest/exerciciorest/postalt',
					parameter, config).success(
					function(data, status, headers, config) {
						$scope.RespostaExercicio = 'Exercicio alterado com sucesso!';
						$scope.BuscarInformacaoExercicio();
						$scope.FecharPopUpEdicaoExercicio();
						
						
					}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
					
		};
		
		// carrega os dados do elemento selecionado para edição .. 
		$scope.CarregarEdicaoExercicio = function(exercicio){
			$scope.istrueExercicio=true;
		    $scope.editedidExercicio = exercicio.idExercicio;
		    $scope.editedtituloExercicio = exercicio.tituloExercicio;
		    $scope.editeddescricaoExercicio = exercicio.descricaoExercicio;

		};

		// função para fechar o popUp de edição ... 
		$scope.FecharPopUpEdicaoExercicio = function(){
		     $scope.istrueExercicio=false;
		  };

		
		// carrega os dados do elemento selecionado para exclusão .. 
		$scope.ExcluirExercicio = function(exercicio){

			var parameter = JSON.stringify({
				type : "exercicio",
				idExercicio : exercicio.idExercicio,
				tituloExercicio : exercicio.tituloExercicio
			});
			
			var config = {
				headers : {
					'Content-Type' : 'application/json;charset=utf-8;'
				}
			}

			$http.post(
					$rootScope.pattern_url+'rest/exerciciorest/postdel',
					parameter, config).success(
					function(data, status, headers, config) {
						$scope.RespostaExercicio = 'Exercício excluído com sucesso!';
						
						
					}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
			
			$scope.BuscarInformacaoExercicio();
			
		};
		
		//*********** Respostas de Avaliações ***************//
		
		  // Busca informações de todas as respostas de avaliacoes salvas no banco ... Via rest
			$scope.BuscarInformacaoRespostaAvaliacao = function() {

				$http.get($rootScope.pattern_url+'rest/respostaavaliacaorest')
						.success(function(data) {
							var respostaAvaliacoesBanco = data["respostaAvaliacao"];
							var arrayBancoRespostaAvaliacoes = [];
							if(Array.isArray(respostaAvaliacoesBanco)){
								arrayBancoRespostaAvaliacoes = respostaAvaliacoesBanco; 
							}
							else{
								arrayBancoRespostaAvaliacoes.push(respostaAvaliacoesBanco);
							}
							$scope.respostaAvaliacoes = arrayBancoRespostaAvaliacoes;
							
						}).error(
								function(data, status, header, config) {
									$scope.Resposta = "Data: " + data + "<hr />status: "
											+ status + "<hr />headers: " + header
											+ "<hr />config: " + config;
								});
				
			};	  
		  
			// envia a informação de um novo cadastro de para o banco ... Via rest
			$scope.SalvarCadastroRespostaAvaliacao = function(respostaavaliacao) {

				var parameter = JSON.stringify({
					type : "respostaavaliacao",
					textoRespostaAvaliacao : respostaavaliacao.textoRespostaAvaliacao,
					statusRespostaAvaliacao : respostaavaliacao.statusRespostaAvaliacao,
					exercicio : respostaavaliacao.exercicio
				});
				
				var config = {
					headers : {
						'Content-Type' : 'application/json;charset=utf-8;'
					}
				}

				$http.post(
						$rootScope.pattern_url+'rest/respostaavaliacaorest/postcad',
						parameter, config).success(
						function(data, status, headers, config) {
							$scope.RespostaResposta = 'Resposta salva com sucesso!';
							$scope.BuscarInformacaoRespostaAvaliacao();						
							
						}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
			};
			
			// Envia a informação de alteração de um elemento para o banco ... Via rest
			$scope.SalvarAlteracaoRespostaAvaliacao = function(editedidRespostaAvaliacao, editedtextoRespostaAvaliacao, editedstatusRespostaAvaliacao, editedRespostaAvaliacaoExercicio){
				
				var parameter = JSON.stringify({
						type : "respostaavaliacao",
					idRespostaAvaliacao : editedidRespostaAvaliacao,
					textoRespostaAvaliacao : editedtextoRespostaAvaliacao,
					statusRespostaAvaliacao : editedstatusRespostaAvaliacao,
					exercicio : editedRespostaAvaliacaoExercicio
				});
				
				

				var config = {
					headers : {
						'Content-Type' : 'application/json;charset=utf-8;'
					}
				}

				$http.post(
						$rootScope.pattern_url+'rest/respostaavaliacaorest/postalt',
						parameter, config).success(
						function(data, status, headers, config) {
							$scope.RespostaResposta = 'Resposta Avaliacao alterado com sucesso!';
							$scope.BuscarInformacaoRespostaAvaliacao();
							$scope.FecharPopUpEdicaoRespostaAvaliacao();
							
							
						}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
						
			};
			
			// carrega os dados do elemento selecionado para edição .. 
			$scope.CarregarEdicaoRespostaAvaliacao = function(respostaAvaliacao){
				$scope.istrueRespostaAvaliacao=true;
			    $scope.editedidRespostaAvaliacao = respostaAvaliacao.idRespostaAvaliacao;
			    $scope.editedtextoRespostaAvaliacao = respostaAvaliacao.textoRespostaAvaliacao;
			    $scope.editedstatusRespostaAvaliacao = respostaAvaliacao.statusRespostaAvaliacao;
			    $scope.editedRespostaAvaliacaoExercicio = respostaAvaliacao.exercicio;

			};

			// função para fechar o popUp de edição ... 
			$scope.FecharPopUpEdicaoRespostaAvaliacao = function(){
			     $scope.istrueRespostaAvaliacao=false;
			  };

			
			// carrega os dados do elemento selecionado para exclusão .. 
			$scope.ExcluirRespostaAvaliacao = function(respostaAvaliacao){

				var parameter = JSON.stringify({
					type : "respostaavaliacao",
					idRespostaAvaliacao : respostaAvaliacao.idRespostaAvaliacao,
					textoRespostaAvaliacao : respostaAvaliacao.textoRespostaAvaliacao
				});
				
				var config = {
					headers : {
						'Content-Type' : 'application/json;charset=utf-8;'
					}
				}

				$http.post(
						$rootScope.pattern_url+'rest/respostaavaliacaorest/postdel',
						parameter, config).success(
						function(data, status, headers, config) {
							$scope.RespostaExercicio = 'Resposta avaliação excluída com sucesso!';
							
							
						}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
				
				$scope.BuscarInformacaoRespostaAvaliacao();
				
			};
			
	// Busca informações de todas as disciplinas salvas no banco ... Via rest
	$scope.BuscarDisciplinas = function() {

		$http.get($rootScope.pattern_url+'rest/disciplinarest')
				.success(function(data) {
					$scope.disciplinas = data["disciplina"];
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};	
	
	
	$scope.filtroDisciplina = function( disciplina ) {
		  
		  if(typeof disciplina == 'undefined'){
			  $scope.idDisciplina = $stateParams.idDisciplina;
		  }else{
			  $scope.idDisciplina = disciplina.idDisciplina;
		  }
		  
		  return function( avaliacao ) {
		    return avaliacao.disciplina.idDisciplina === $scope.idDisciplina;
		  };
		};
		
	$scope.filtroAvaliacao = function( avaliacao ) {
		if(typeof avaliacao == 'undefined'){
			$scope.idAvaliacao = $stateParams.idAvaliacao;
		}else{
		    $scope.idAvaliacao = avaliacao.idAvaliacao;
		}
		
		  return function( exercicio ) {
		    return exercicio.avaliacao.idAvaliacao === $scope.idAvaliacao;
		  };
		};
	
	$scope.filtroExercicio = function( exercicio ) {
		if(typeof exercicio == 'undefined'){
			$scope.idExercicio = $stateParams.idExercicio;
		}else{
		    $scope.idExercicio = exercicio.idExercicio;
		}
		
		  return function( respostaAvaliacao ) {
		    return respostaAvaliacao.exercicio.idExercicio === $scope.idExercicio;
		  };
		};	
		
	$scope.voltar =	function() {
		    window.history.back();
		};
		
    
    $scope.validarFormRespostas = function() {
	    var radios = [];
	    var formValid = true;
	    var idRespostaselecionada;
		var GrupoExercicios = [];
		$scope.RespostasDoUsuario = [];
	    
	    //Verifico todos os radios da tela para pegar seus grupos
		$('input:radio').each(function() {
			if(!GrupoExercicios.includes($(this.name).selector)){
				GrupoExercicios.push($(this.name).selector);
			}			
		});
		
		// Valida se alguma resposta não foi selecionada antes de enviar
	    for (var i = 0; i < GrupoExercicios.length; i++){
	    	idRespostaselecionada = $("input:radio[name='"+GrupoExercicios[i]+"']:checked").val();
	    	
	       if(typeof idRespostaselecionada === 'undefined'){
	    	   formValid = false;
	       }
	       
	       now = new Date;
	       
	       //Verifico se a resposta selecionada é correta ou incorreta
	       for(var j = 0; j < $scope.respostaAvaliacoes.length; j++){
	    	   if($scope.respostaAvaliacoes[j].idRespostaAvaliacao === idRespostaselecionada){
	    		   $scope.RespostasDoUsuario.push({ usuario :  {idUsuario : $scope.UsuarioLogado},
	    			   respostaAvaliacao : {idRespostaAvaliacao : idRespostaselecionada},
	    			   statusRespostaUsuario : $scope.respostaAvaliacoes[j].statusRespostaAvaliacao,
	    			   dataResposta : now });

	    		   
	    		   
	    	   }
	    	   
	       }

		        
	    }

	    if (!formValid){
	    	swal("Para enviar a avaliação, todas as questões devem ser preenchidas.");
	    }else{
	    	$scope.salvaRespostasUsuario($scope.RespostasDoUsuario);
	    	swal("Parabéns sua avaliação foi registrada.");
	    	$scope.voltar();
	    }
	    
	    return formValid;
	    
	    
	};
	
	//*************** Valida e salva respostas do usuário ***************//
	
	// envia a informação de resposta de avaliação ... Via rest
	$scope.salvaRespostasUsuario = function(respostaUsuario) {
		for(i = 0; i < respostaUsuario.length ; i++){
			var parameter = JSON.stringify({
				type : "respostaUsuario",
				usuario : respostaUsuario[i].usuario,
				respostaAvaliacao : respostaUsuario[i].respostaAvaliacao,
				statusRespostaUsuario : respostaUsuario[i].statusRespostaUsuario,
				dataResposta : respostaUsuario[i].dataResposta
			});
			
			var config = {
				headers : {
					'Content-Type' : 'application/json;charset=utf-8;'
				}
			}
	
			$http.post(
					$rootScope.pattern_url+'rest/respostausuariorest/postenvio',
					parameter, config).success(
					function(data, status, headers, config) {
						
					}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
		}

	};
	
	// Valida se usuário já respondeu a avaliação
	// Busca informações de todas as avaliacoes salvas no banco ... Via rest
	$scope.ValidaAcessoAvaliacao = function(idAvaliacao) {
		if(typeof $scope.respostasUsuario != 'undefined'){
			for(i=0; i< $scope.respostasUsuario.length; i++){
				if($scope.respostasUsuario[i].respostaAvaliacao.exercicio.avaliacao.idAvaliacao == idAvaliacao ){
					return true;
				}
			}	
			return false;
		}
		
	};
	
	$scope.buscarRespostasUsuário = function(){
		
		 $http.get($rootScope.pattern_url+'rest/respostausuariorest/listarespostausuario/'+$scope.UsuarioLogado)
			.success(function(data) {
				var respostaUsuarioBanco = data["respostaUsuario"];
				var arrayBanco = [];
				if(Array.isArray(respostaUsuarioBanco)){
					arrayBanco = respostaUsuarioBanco; 
				}
				else{
					arrayBanco.push(respostaUsuarioBanco);
				}
				$scope.respostasUsuario = arrayBanco;
				
			}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
		
	}
	
	  
	// função que inicia a tela
		$scope.iniciaTela = function() {
			
			$scope.BuscarInformacaoAvaliacao();
			$scope.BuscarInformacaoDisciplina();
			$scope.BuscarInformacaoUsuarios();
			// Exercicios
			$scope.BuscarInformacaoExercicio();
			// Respostas
			$scope.BuscarInformacaoRespostaAvaliacao();
			$scope.BuscarDisciplinas();
			//Respostas do usuário
			$scope.buscarRespostasUsuário();
		};
		$scope.iniciaTela();
	
});