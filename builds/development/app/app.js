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
        .controller('MainCtrl', MainCtrl)
        .controller('AboutCtrl', AboutCtrl);

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
    function AboutCtrl($scope) {
        $scope.title = "This is scope title About";
    }
})();
