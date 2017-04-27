angular.module("app").controller('FeedCtrl', function($scope, $http, $cookieStore, $rootScope) {
		
	$scope.buscarFeedProjeto = function(){
		$http.post('http://localhost:8080/ProjetoPAP/rest/feedrest/buscaFeedProjeto/'+$rootScope.projeto_selecionado_id)
		.success(function(data) {
			if(data != null){
				$scope.feed = data;
				$scope.idFeed = data['idFeed']
				$scope.buscarRespostas();
			}
		});	
	} 
	
	$scope.buscarRespostas = function(idFeed){
		$http.post('http://localhost:8080/ProjetoPAP/rest/feedrest/getresposta/'+$scope.idFeed)
		.success(function(data) {
			if(data != null){
				var respostaBanco = data["resposta"];
				var arrayBanco = [];
				if(Array.isArray(respostaBanco)){
					arrayBanco = respostaBanco; 
				}
				else{
					arrayBanco.push(respostaBanco);
				}
				$scope.respostasFeed = arrayBanco;
			}
		});
	}
	
	
	$scope.salvarPost = function(feed, respostaFeed){
		var parameter = JSON.stringify({
			type : "resposta",
			textoResposta : respostaFeed,
			feedResposta : feed
		});
		
		var config = { headers : {'Content-Type' : 'application/json;charset=utf-8;'}}

			$http.post(
					'http://localhost:8080/ProjetoPAP/rest/feedrest/postcadresposta/'+$cookieStore.get("session_user_id"),
					parameter, config).success(
					function(data, status, headers, config) {
						console.log("Salvo com sucesso!");		
						$scope.buscarRespostas();
						$scope.comentarioFeed = null;
					});

	}
	
	$scope.iniciaTela = function(){
		if($rootScope.projeto_selecionado_id != null){
			$scope.buscarFeedProjeto();
		}
	}
	$scope.iniciaTela();
	

});

