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
        .value('some_val', 'this is some wow')

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(false);
        //$logProvider.debugEnable(true);

    }

})();
