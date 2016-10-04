// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact'
        ])
        .config(Config)


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        //$locationProvider.html5Mode(true);
       // $logProvider.debugEnable(true);
    }

})();
