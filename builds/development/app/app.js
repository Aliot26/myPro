// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngFit.about',
            'ngFit.contact'
        ])
        .config(ngFitConfig)
        .controller('MainCtrl', MainCtrl);

    function ngFitConfig($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'/view/index.html',
                controller: 'MainCtrl'
            });
    }

    function MainCtrl($scope) {
        $scope.title = "This is our first scope title";
    }

})();
