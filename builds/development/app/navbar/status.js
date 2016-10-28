;(function(){
    "use strict";

    angular
        .module('ngFit.status', [
                'ngRoute','Authentication'
        ])
        //.constant('SERVER_URL', 'http://localhost:8000/server.js')
        .controller('AuthCtrl', AuthCtrl)
        .controller('StatusCtrl', StatusCtrl)
        //.factory('Auth', AuthFactory);

        function AuthCtrl($scope, $log, authentication){
            var vm = this;

            vm.credentials = {
                email: null,
                password: null
            };
    
            vm.register = function () {
                authentication.register(vm.nUser);
            };

            vm.login = function(){
                authentication.login(vm.credentials);
            }
        }

        function StatusCtrl($scope, $log, authentication, $rootScope) {
            var vm = this;

            vm.getEmail = function () {                
                return authentication.getEmail();
            };
            
            vm.getUid = function(){
                if($rootScope.currentUser != null){
                console.log($rootScope.currentUser, "aaaa");
                return authentication.getUid;}
            };

            vm.logout = function(){
                authentication.logout();
            }
        }

})();




