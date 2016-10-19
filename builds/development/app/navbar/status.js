;(function(){
    "use strict";

    angular
        .module('ngFit.status', [
                'ngRoute'
        ])
        .constant('SERVER_URL', )
        .controller('AuthCtrl', AuthCtrl)
        .factory('Auth', AuthFactory);

        function AuthCtrl($scope, $log){
            var vm = this;

            vm.credentials = {
                username: null,
                password: null
            };

            vm.login = function(){
                $log.debug('Login!');
                auth.login(vm.credentials.username, vm.credentials.password);
            }
        }

        function AuthFactory($http, SERVER_URL){
            var auth = {};

            auth.login = function(_username, _password){
                var auth_url = SERVER_URL + 'auth?login';
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
