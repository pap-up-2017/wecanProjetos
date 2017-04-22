angular.module("app").controller('PageNotificacaoCtrl', function($scope, $http, $cookieStore, $rootScope) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
	
	
	// Busca informações salvas no banco... via rest
	$scope.BuscarNotificacoes = function() {
		console.log("função BuscarNotificações..");
		$http.get('http://localhost:8080/ProjetoPAP/rest/notificacaorest/user/'+ $scope.UsuarioLogado)
				.success(function(data) {
					$rootScope.NotificacoesPendentes = 0;
					if(data != null){
						var notificacoesBanco = data["notificacao"];
						var arrayBanco = [];
						if(Array.isArray(notificacoesBanco)){
							arrayBanco = notificacoesBanco;
							for (i = 0; i < arrayBanco.length; i++) {
								if(arrayBanco[i].statusNotificacao != 'Lida'){
									$rootScope.NotificacoesPendentes++;
								}
							}
						}
						else{
							arrayBanco.push(notificacoesBanco);
							if(arrayBanco.statusNotificacao != 'Lida'){
								$rootScope.NotificacoesPendentes++;
							}
						
						}
						$scope.notificacoes = arrayBanco;
					}
					
				}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
						});
	};
	
	// envia a informação de um novo cadastro no banco .. via rest .. 
	$rootScope.InserirNotificacao = function(notificacao) {
		console.log("Salvar um novo cadastro de notificacao ...")

		var parameter = JSON.stringify({
			type : "notificacao",
			tituloNotificacao : notificacao.tituloNotificacao,
			textoNotificacao : notificacao.textoNotificacao,
			linkAcessoNotificacao : notificacao.linkAcessoNotificacao,
			usuario : { idUsuario: notificacao.usuario} 
		});

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/notificacaorest/postcad',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Notificação salva com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarNotificacoes();
	};
	
	// Envia a informação de alteração de um elemento para o banco ... Via rest
	$scope.SalvarAlteracao = function(editedidNotificacao, editedtituloNotificacao, editedtextoNotificacao, editedlinkAcessoNotificacao){
		console.log("Salvar uma alteração de notificação...")
		
		var parameter = JSON.stringify({
			type : "notificacao",
			idNotificacao : editedidNotificacao,
			tituloNotificacao : editedtituloNotificacao,
			textoNotificacao : editedtextoNotificacao,
			linkAcessoNotificacao : editedlinkAcessoNotificacao
		});
		
		//console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/notificacaorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Notificação salva com sucesso!';
					$scope.FecharPopUpEdicao();
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		$scope.BuscarNotificacoes();
		
	};
	
	// Atualiza status da tarefa
	$scope.AtualizaStatus = function(notificacao ){
		console.log("Atualiza status notificação...")
		
		var parameter = JSON.stringify({
			type : "tarefa",
			idNotificacao : notificacao.idNotificacao,
			statusNotificacao : 'Lida'
			//nomeTarefa : editednameTarefa,
			//projetoTarefa : editedProjetoTarefa,
			//descricaoTarefa : editeddescricaoTarefa,
			//prazoEntrega: editedprazoEntrega
		});
		
//		console.log(parameter);

		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/notificacaorest/postalt',
				parameter, config).success(
				function(data, status, headers, config) {
					
					$scope.BuscarNotificacoes();
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
					
				
				});
		
		//$scope.BuscarInformacao();
		
	};
	
	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(notificacao){
		console.log("Excluir uma notificação ...")

		var parameter = JSON.stringify({
			type : "notificacao",
			idNotificacao : notificacao.idNotificacao
		});
		
		var config = {
			headers : {
				'Content-Type' : 'application/json;charset=utf-8;'
			}
		}

		$http.post(
				'http://localhost:8080/ProjetoPAP/rest/notificacaorest/postdel',
				parameter, config).success(
				function(data, status, headers, config) {
					$scope.Resposta = 'Notificação excluída com sucesso!';
					
					
				}).error(
				function(data, status, header, config) {
					$scope.Resposta = "Data: " + data + "<hr />status: "
							+ status + "<hr />headers: " + header
							+ "<hr />config: " + config;
				});
		
		$scope.BuscarNotificacoes();
		
	};
	
	// carrega os dados do elemento selecionado para edição .. 
	$scope.CarregarEdicao = function(notificacao){
		$scope.istrue=true;
	    $scope.editedidNotificacao = notificacao.idNotificacao;
	    $scope.editedtituloNotificacao = notificacao.tituloNotificacao;
	    $scope.editedtextoNotificacao = notificacao.textoNotificacao;
	    $scope.editedlinkAcessoNotificacao = notificacao.linkAcessoNotificacao;
	    //console.log(notificacao);
	};
	
	// função para fechar o popUp de edição ... 
	$scope.FecharPopUpEdicao = function(){
	     $scope.istrue=false;
	  };
	
	// função que inicia a tela
	$scope.iniciaTela = function() {
		console.log("Iniciando a tela");
		
		$scope.BuscarNotificacoes();
		
	};
	$scope.iniciaTela();
});