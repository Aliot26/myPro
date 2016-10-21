;(function(){
    "use strict";

    angular
        .module('ngFit.status', [
                'ngRoute'
        ])
        .constant('SERVER_URL', 'http://localhost:8000/server.js')
        .controller('AuthCtrl', AuthCtrl)
        .factory('Auth', AuthFactory);

        function AuthCtrl($scope, $log, authentication){
            var vm = this;

            vm.credentials = {
                email: null,
                password: null
            };

            vm.login = function(){
                authentication.login(vm.credentials);
            }
        }

        function AuthFactory($http, SERVER_URL, $log){
            var auth = {};

            auth.login = function(_username, _password){
                var auth_url = SERVER_URL + 'auth?login=' + _username + '&password=' + _password;
                return $http.get(auth_url)
                    .then(function(response){
                        $log.debug(response);
                    })
            }

            return auth;
        }
})();



//.config(['$routeProvider', function ($routeProvider) {
//    SrouteProvider.when
//}])

//.controller('NavbarCtrl',['$scope', function() {
//
//    }])
