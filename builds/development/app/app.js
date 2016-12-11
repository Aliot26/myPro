window.onload = function(){$.material.init();};



(function(){
    'use strict';

    angular
        .module('myBlog', [
            'ngRoute',
            'ngCookies',
            'ngMessages',
            'myBlog.fitfire.service',
            'Authentication',
            'myBlog.main',
            'myBlog.about',
            'myBlog.contact',
            'myBlog.blog',
            'ngAnimate',
            'myBlog.status'
        ])
        .config(Config)
        .constant('FIREBASE_URL', 'https://mypro-b3c3e.firebaseio.com');
        

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $logProvider.debugEnabled(true);

    }

})();
