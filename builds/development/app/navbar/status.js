;(function(){
    "use strict";

    angular
        .module('ngFit.status', [
                'ngRoute'
        ])
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
            }
        }

        function AuthFactory($http){
            var auth = {};

            auth.login = function(_username, _password){
                
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
