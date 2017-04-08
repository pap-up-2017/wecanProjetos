angular.module("app").controller('DashBoardCtrl', function($scope, $http, $cookieStore) {
	
	$scope.UsuarioLogado = $cookieStore.get("session_user_id");
});