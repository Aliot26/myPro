;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute', 'ngFit.status'])
        .config(['$routeProvider', configAbout])
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function AboutCtrl($scope, $rootScope, $log, authentication){
        var vm = this;
        $rootScope.curPath = 'about';
        $log.log('about');
    }

    function configAbout($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm',
                //resolve: {
                //    'currentAuth': function (authentication) {
                //        return authentication.ngAuth().$requireSignIn();
                //    }
                //}
            });
    }


})();