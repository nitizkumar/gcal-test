app.controller('loginController', ['$scope', '$http', '$state','authService',function ($scope, $http, $state,authService) {

  var CLIENT_ID = '400154697767-ejegm5o24iovkfn56i44hp4pvisisab8.apps.googleusercontent.com';

  var SCOPES = ['https://www.googleapis.com/auth/calendar'];

  $scope.login = function () {
    if(window.gapi == undefined){
      // alert('No Network');
      $state.go('calendar');
      return;
    }

    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);

    return false;
  }

  function handleAuthResult(authResult) {
    console.log(authResult);
    authService.setAuth(authResult);
    $state.go('calendar');
  }
}]);