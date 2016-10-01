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

/**
 * Created by szaharov on 28/05/15.
 */

/**
 * Created by szaharov on 28/05/15.
 */
