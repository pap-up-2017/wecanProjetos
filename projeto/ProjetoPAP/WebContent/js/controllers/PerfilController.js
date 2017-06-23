angular.module("app").controller('PerfilCtrl', function($scope, $http, $cookieStore, $state, $stateParams, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	// Busca informação para preenchimento do perfil
	$rootScope.BuscarPerfilUsuario = function() {
		$http.post($rootScope.pattern_url+'rest/usuariorest/busca/'+$scope.UsuarioLogado)
				.success(function(data) {
					$scope.nomeUsuario = data["nomeUsuario"];
					$scope.usernameUsuario = data["usernameUsuario"];
					$scope.emailUsuario = data["emailUsuario"];
					$scope.tipoUsuario = (data["tipoUsuario"]["tipoUsuario"]);
					$scope.cursoUsuario = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuario = (data["instituicaoUsuario"]["nomeInstituicao"]);
				});
	};
	
	// Busca informação para preenchimento do perfil
	$scope.detalharUsuario = function() {
		$http.post($rootScope.pattern_url+'rest/usuariorest/busca/'+$stateParams.idUsuario)
				.success(function(data) {
					$scope.idUsuairiod = data["idUsuario"];
					$scope.nomeUsuariod = data["nomeUsuario"];
					$scope.usernameUsuariod = data["usernameUsuario"];
					$scope.emailUsuariod = data["emailUsuario"];
					$scope.tipoUsuariod = (data["tipoUsuario"]["tipoUsuario"]);
					$scope.estadoUsuariod = (data["cidadeUsuario"]["estadoCidade"]["nomeEstado"]);
					$scope.cidadeUsuariod = (data["cidadeUsuario"]["nomeCidade"]);
					$scope.cursoUsuariod = (data["cursoUsuario"]["nomeCurso"]);
					$scope.instituicaoUsuariod = (data["instituicaoUsuario"]["nomeInstituicao"]);
				});
	};
	
	// Busca as avaliacoes do usuario
	$scope.BuscarAvaliacoesPorUsuario = function() {
		$http.get($rootScope.pattern_url+'rest/avaliacaousuariorest/getporusuario/'+$stateParams.idUsuario)
				.success(function(data) {
					if(data != null){
						var avalBanco = data["avaliacaoUsuario"];
						var arrayBanco = [];
						if(Array.isArray(avalBanco)){
							arrayBanco = avalBanco; 
						}
						else{
							arrayBanco.push(avalBanco);
						}
						$scope.avaliacoesDoUsuario = arrayBanco;
						$scope.BuscarItensDisponiveis();
					}else{
						$scope.mediaPontuacaoUsuario = 0;
					}
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	// Busca os itens disponiveis ...
	$scope.BuscarItensDisponiveis = function() {

		$http.get($rootScope.pattern_url+'rest/itemusuariorest')
				.success(function(data) {
					var itensBanco = data["itemAvaliacaoUsuario"];
					var arrayBanco = [];
					if(Array.isArray(itensBanco)){
						arrayBanco = itensBanco; 
					}
					else{
						arrayBanco.push(itensBanco);
					}
					$scope.itensUsuario = arrayBanco;
					$scope.gerarPontuacaoDoUSuario();
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
	
	$scope.gerarPontuacaoDoUSuario = function(){
		if(typeof $scope.avaliacoesDoUsuario != 'undefined'){
			$scope.arrayPontuacao = [];
			for(var i = 0 ; i < $scope.itensUsuario.length ; i++){
				var somatorioItem = 0;
				var totalItem = 0;
				for(var j = 0 ; j < $scope.avaliacoesDoUsuario.length ; j++){
					if($scope.itensUsuario[i].id == $scope.avaliacoesDoUsuario[j].itemAvaliado.id){
						somatorioItem = somatorioItem + parseFloat($scope.avaliacoesDoUsuario[j].notaAvaliacao);
						totalItem++;
					}
				}
				
				var pontuacaoItem = somatorioItem / totalItem;
				$scope.arrayPontuacao.push({ item : $scope.itensUsuario[i],
											 pontuacaoItem : pontuacaoItem,
											 somatorioItem : somatorioItem,
											 totalItem : totalItem });
			}
		
			var pontuacaoTotal = 0;
			
			for(var i = 0 ; i<$scope.arrayPontuacao.length;i++){
					pontuacaoTotal = pontuacaoTotal + parseFloat($scope.arrayPontuacao[i].pontuacaoItem);
			}
			
			$scope.mediaPontuacaoUsuario = pontuacaoTotal / $scope.arrayPontuacao.length;
			console.log("Media pontuação: "+$scope.mediaPontuacaoUsuario);
		}
	}
	
	$scope.detalharPontuacaoUsuario = function(){
		$scope.openPopUpPontuacao = true;
	}
	
	$scope.fecharPopUpPontuacao = function(){
		$scope.openPopUpPontuacao = false;
	}
	
	// ******** Mostra habilidades do perfil *****************//
	
	$scope.buscarRespostasUsuario = function(){
		
		 $http.get($rootScope.pattern_url+'rest/respostausuariorest/listarespostausuario/'+$stateParams.idUsuario)
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
				
				$scope.calculaHabilidadesUsuario($scope.respostasUsuario);
				
			}).error(
					function(data, status, header, config) {
						$scope.Resposta = "Data: " + data + "<hr />status: "
								+ status + "<hr />headers: " + header
								+ "<hr />config: " + config;
					});
		
	}
	
	

		$scope.calculaHabilidadesUsuario = function(
			respostasUsuario) {

		var habilidades = [];
		var disciplinas = [];
		var respostas = [];
		

		for (i = 0; i < respostasUsuario.length; i++) {

			var disciplina = respostasUsuario[i].respostaAvaliacao.exercicio.avaliacao.disciplina.nomeDisciplina;
			var statusReposta = respostasUsuario[i].statusRespostaUsuario;
			var idAvaliacao = respostasUsuario[i].respostaAvaliacao.exercicio.avaliacao.idAvaliacao;
			var resposta = [];
			var avaliacaoExiste = false;
			var avaliacaoExistePos = -1;
			
			// Inclui a primeira habilidade
			if (habilidades.length == 0) {
				resposta.push({
					idAvaliacao : idAvaliacao,
					respostasCorretas : ((statusReposta == 'Correta') ? 1: 0),
					totalRespostas : 1,
					idRespUser : [respostasUsuario[i].idRespostaUsuario],
					percentualAcerto : ((statusReposta == 'Correta') ? 1 : 0)/1*100
					
				});
				
				habilidades.push({
							disciplina : disciplina,
							totalAvaliacoes : 1,
							avaliacoes : resposta,
							percentualDisciplina : 0//((statusReposta == 'Correta') ? 1 : 0)/1*100

						});
			} else {
				// Verifico se a habilidade foi incluída
				for (j = 0; j < habilidades.length; j++) {

					// Valido se a disciplina não existe
					if (habilidades[j].disciplina.indexOf(disciplina) == -1) {
						// Valido se a avaliação já existe
						resposta.push({
							idAvaliacao : idAvaliacao,
							respostasCorretas : ((statusReposta == 'Correta') ? 1 : 0),
							totalRespostas : 1,
							idRespUser : [respostasUsuario[i].idRespostaUsuario],
							percentualAcerto : ((statusReposta == 'Correta') ? 1 : 0)/1*100
						});
						
						habilidades.push({
							disciplina : disciplina,
							totalAvaliacoes : 1,
							avaliacoes : resposta,
							percentualDisciplina : 0//((statusReposta == 'Correta') ? 1 : 0)/1*100
						});
					}else{
						for (k = 0; k < habilidades[j].avaliacoes.length; k++) {
							for(x = 0; x < habilidades[j].avaliacoes.length;x++ ){
								
								if(idAvaliacao === habilidades[j].avaliacoes[x].idAvaliacao){
									avaliacaoExiste = true;
									avaliacaoExistePos = x;
								}
							}
							if (!avaliacaoExiste) {
								// Caso não exista, incluo
								// Sempre que adiciona uma avaliação, adiciona no total
								habilidades[j].totalAvaliacoes = habilidades[j].totalAvaliacoes + 1; 
								
								habilidades[j].avaliacoes.push({
												idAvaliacao : idAvaliacao,
												respostasCorretas : ((statusReposta == 'Correta') ? 1 : 0),
												totalRespostas : 1,
												idRespUser : [respostasUsuario[i].idRespostaUsuario],
												percentualAcerto : ((statusReposta == 'Correta') ? 1 : 0)/1*100
											})
								
							} else {
								// Valida se resposta do usuário já está no array
								if(habilidades[j].avaliacoes[k].idRespUser.indexOf(respostasUsuario[i].idRespostaUsuario) == -1){
									
									if(habilidades[j].avaliacoes[avaliacaoExistePos].idAvaliacao == habilidades[j].avaliacoes[k].idAvaliacao){
										if (statusReposta == 'Correta' ) {	
											habilidades[j].avaliacoes[k].respostasCorretas += 1;
											habilidades[j].avaliacoes[k].idRespUser.push(respostasUsuario[i].idRespostaUsuario);
											habilidades[j].avaliacoes[k].totalRespostas = habilidades[j].avaliacoes[k].totalRespostas + 1;
											habilidades[j].avaliacoes[k].percentualAcerto =  habilidades[j].avaliacoes[k].respostasCorretas/habilidades[j].avaliacoes[k].totalRespostas*100;
										} else {
											habilidades[j].avaliacoes[k].totalRespostas = habilidades[j].avaliacoes[k].totalRespostas + 1;
											habilidades[j].avaliacoes[k].idRespUser.push(respostasUsuario[i].idRespostaUsuario);
											habilidades[j].avaliacoes[k].percentualAcerto =  habilidades[j].avaliacoes[k].respostasCorretas/habilidades[j].avaliacoes[k].totalRespostas*100;
											
										}
									}
								}
							}
						}
					}

				}
				
			}
			
		}
		// Preenche o valor do percentual de acerto da disciplina
		for(i = 0; i < habilidades.length; i++){
			console.log(habilidades[i].disciplina);
			for(j = 0; j < habilidades[i].avaliacoes.length; j++ ){
				console.log(habilidades[i].avaliacoes[j].percentualAcerto);
				habilidades[i].percentualDisciplina += habilidades[i].avaliacoes[j].percentualAcerto; 
			}
			
		}
		
		$scope.habilidades = habilidades;
		console.log(habilidades);
	}
		
	$scope.divisao = function(num1, num2){
		
		return Math.round(num1/num2);
	}
	
	/* **** Comentarios do usuario *** */
	
	// Busca as comentarios do usuario
	$scope.BuscarComentariosPorUsuario = function() {
		$http.get($rootScope.pattern_url+'rest/comentariousuariorest/getrecebecomentario/'+ $stateParams.idUsuario)
				.success(function(data) {
					if(data != null){
						var comentariosBanco = data["comentarioUsuario"];
						var arrayBanco = [];
						if(Array.isArray(comentariosBanco)){
							arrayBanco = comentariosBanco; 
						}
						else{
							arrayBanco.push(comentariosBanco);
						}
						$scope.comentariosUsuario_Recebido = arrayBanco;
					}
				}).error(
						function(data, status, header, config) {
							console.log("Data: " + data + " | status: " + status + " | headers: " + header
									+ " | config: " + config);
						});
	};
			
	/* **** FIM Comentarios do usuario *** */

	// função que inicia a tela
	$scope.iniciaTela = function() {
		if($stateParams.idUsuario != null){
			$scope.detalharUsuario();
			$scope.BuscarAvaliacoesPorUsuario();
			$scope.openPopUpPontuacao = false;
			$scope.buscarRespostasUsuario();
			$scope.BuscarComentariosPorUsuario();
			
		}
		$rootScope.BuscarPerfilUsuario();
	};
	
	$scope.iniciaTela();
});