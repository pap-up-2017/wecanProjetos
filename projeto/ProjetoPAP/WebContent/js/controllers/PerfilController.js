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
	}
	
	$scope.detalharPontuacaoUsuario = function(){
		$scope.openPopUpPontuacao = true;
	}
	
	$scope.fecharPopUpPontuacao = function(){
		$scope.openPopUpPontuacao = false;
	}

	// função que inicia a tela
	$scope.iniciaTela = function() {
		if($stateParams.idUsuario != null){
			$scope.detalharUsuario();
			$scope.BuscarAvaliacoesPorUsuario();
			$scope.openPopUpPontuacao = false;
		}
		$rootScope.BuscarPerfilUsuario();
	};
	
	$scope.iniciaTela();
});