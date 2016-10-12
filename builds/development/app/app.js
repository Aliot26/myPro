// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'firebase',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact'
        ])
        .config(Config)
        

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);

    }

})();
