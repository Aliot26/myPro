// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', ['ngRoute'])
        .config(ngFitConfig)
        .controller('MainCtrl', MainCtrl)
        .controller('AboutCtrl', AboutCtrl);

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
                templateUrl:'/view/contact.html'
                //controller: 'ContactCtrl'
            });
    }

    function MainCtrl($scope) {
        $scope.title = "This is our first scope title";
    }
    function AboutCtrl($scope) {
        $scope.title = "This is scope title About";
    }
})();

/**
 * Created by szaharov on 28/05/15.
 */

/**
 * Created by szaharov on 28/05/15.
 */
