// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', ['ngRoute'])
        .config(ngFitConfig);

    function ngFitConfig($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'/view/index.html'
            });
    }
})();
