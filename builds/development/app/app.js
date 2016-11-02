// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngCookies',
            'ngFit.fitfire.service',
            'Authentication',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact',
            'ngFit.status'
        ])
        .config(Config)
        .constant('FIREBASE_URL', 'https://mypro-b3c3e.firebaseio.com');
        

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
        $logProvider.debugEnabled(true);

    }

})();
