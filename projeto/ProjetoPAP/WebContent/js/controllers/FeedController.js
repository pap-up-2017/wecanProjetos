angular.module("app").controller('FeedCtrl', function($scope, $http, $cookieStore) {
	
	$scope.buscarFeeds = function(){
		$http.get('http://localhost:8080/ProjetoPAP/rest/feedrest')
		.success(function(data) {
			var feedsBanco = data["feed"];
			var arrayBanco = [];
			if(Array.isArray(feedsBanco)){
				arrayBanco = feedsBanco; 
			}
			else{
				arrayBanco.push(feedsBanco);
			}
			$scope.feeds = arrayBanco;
		});
		
		$http.get('http://localhost:8080/ProjetoPAP/rest/feedrest/getresposta')
		.success(function(data) {
			var respostaBanco = data["resposta"];
			var arrayBanco = [];
			if(Array.isArray(respostaBanco)){
				arrayBanco = respostaBanco; 
			}
			else{
				arrayBanco.push(respostaBanco);
			}
			$scope.respostas = arrayBanco;
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
						$scope.buscarFeeds();
					});
		$scope.buscarFeeds();
	}
	
	$scope.buscarFeeds();
});

