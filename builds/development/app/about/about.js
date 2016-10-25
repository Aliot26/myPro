;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function AboutCtrl($scope, $rootScope, $log, authentication){
        var vm = this;
        $rootScope.curPath = 'about';
        $log.log('about');
    }

    function config($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm',
                resolve: {
                    'currentAuth': function (authentication) {
                        return authentication.ngAuth().$requireSignIn();
                    }
                }
            });
    }


})();