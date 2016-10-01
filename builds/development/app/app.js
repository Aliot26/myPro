// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', ['ngRoute'])
        .config(ngFitConfig)
        .controller('MainCtrl');

    function ngFitConfig($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'/view/index.html',
                controller: 'MainCtrl'
            })
            .when('/about',{
                templateUrl:'/view/about.html',
                controller: 'AboutCtrl'
            })
            .when('/contact',{
                templateUrl:'/view/contact.html',
                controller: 'ContactCtrl'
            });
    }

    function MainCtrl($scope) {
        $scope.title = "This is our first scope title"
    }
})();
