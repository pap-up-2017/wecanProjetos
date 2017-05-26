angular.module("app").controller('excluirUsuarioCtrl', function($scope, $http, $cookieStore, $rootScope) {

	// carrega os dados do elemento selecionado para exclusão .. 
	$scope.ExcluirElemento = function(){
		
		swal({
			  title: "Você tem certeza?",
			  text: "Depois de confirmar não será possivel reverter essa ação.",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Sim, exclua meu perfil",
			  closeOnConfirm: false
			},
			function(){
				$http.post($rootScope.pattern_url+'rest/usuariorest/postdel/'+ $cookieStore.get("session_user_id"))
						.success(function(data, status, headers, config) {
							console.log(data);
						}).error(
						function(data, status, header, config) {
							$scope.Resposta = "Data: " + data + "<hr />status: "
									+ status + "<hr />headers: " + header
									+ "<hr />config: " + config;
				});
				swal("Deletado!", "Vamos sentir sua falta :(.", "success");
				$cookieStore.remove("session_id");
				$cookieStore.remove("session_user_id");
				$cookieStore.remove("session_data_val");
				$cookieStore.remove("session_token_val");
				$cookieStore.remove("session_tipo_usuario");;
				window.location.href = $rootScope.pattern_url+"home.html";
			});
	};
	
});