angular.module("app").controller('PageAvaliacaoCtrl', function($scope, $http, $rootScope, $stateParams) {
	
	// Busca informações de todas as avaliacoes salvas no banco ... Via rest
	$scope.BuscarInformacaoAvaliacao = function() {
		//console.log("função BuscarInformacao Avaliação...");

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
		//console.log("Salvar um novo cadastro de avaliação...")

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
		//console.log(avaliacao);
		$scope.BuscarInformacaoAvaliacao();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidAvaliacao, editednomeAvaliacao){
		//console.log("Salvar uma nova Alteração de avaliação ...")
		
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
		//console.log("Excluir um elemento ...")

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
		//console.log("função BuscarInformacao..");

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
		//console.log("função buscar informações de usuários");

		$http.get($rootScope.pattern_url+'rest/usuariorest')
				.success(function(data) {
					var usuariosBanco = data["usuario"];
					////console.log(usuariosBanco);
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
			////console.log("função BuscarInformacao Exercício...");

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
			////console.log("Salvar um novo cadastro de exercício...")

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
			//console.log("Salvar uma nova Alteração de exercício ...")
			
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
			//console.log("Excluir um elemento ...")

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
				////console.log("função BuscarInformacao Resposta Avaliação...");

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
				//console.log("Salvar um novo cadastro de resposta avaliacao...")

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
				//console.log("Salvar uma nova Alteração de resposta exercício ...")
				
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
				//console.log(respostaAvaliacao.exercicio);
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
				//console.log("Excluir um elemento ...")

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
		  //console.log(disciplina);
		  //console.log($stateParams);
		  
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
		//console.log("filtroAvaliacao: "+$stateParams.idAvaliacao);
		//console.log(avaliacao);
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
		//console.log(exercicio);
		//console.log($stateParams);
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

	$('a#enviar').click(function() {
		
		//alert($("input:radio[name='3']:checked").val()+ ' '+
		//      $("input:radio[name='4']:checked").val());
		$scope.validateForm();
		});
	
	var GrupoExercicios = [];

	$scope.validateForm = function() {
	    var radios = [];
	    var formValid = true;
	    
	    //Verifico todos os radios da tela para pegar seus grupos
		$('input:radio').each(function() {
			if(!GrupoExercicios.includes($(this.name).selector)){
				GrupoExercicios.push($(this.name).selector);
			}			
		});
		
		// Valida se alguma resposta não foi selecionada antes de enviar
	    for (var i = 0; i< GrupoExercicios.length; i++){
	       if(typeof $("input:radio[name='"+GrupoExercicios[i]+"']:checked").val() === 'undefined'){
	    	   formValid = false;
	       }
	        
	    }

	    if (!formValid){
	    	swal("Para enviar a avaliação, todas as questões devem ser preenchidas.");
	    }else{
	    	swal("Parabéns sua avaliação foi registrada.");
	    }
	    
	    return formValid;
	    
	    
	};
	
	  
	// função que inicia a tela
		$scope.iniciaTela = function() {
			//console.log("Iniciando a tela de avaliações");
			
			$scope.BuscarInformacaoAvaliacao();
			$scope.BuscarInformacaoDisciplina();
			$scope.BuscarInformacaoUsuarios();
			// Exercicios
			$scope.BuscarInformacaoExercicio();
			// Respostas
			$scope.BuscarInformacaoRespostaAvaliacao();
			$scope.BuscarDisciplinas();
		};
		$scope.iniciaTela();
	
});