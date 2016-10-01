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
        .controller('MainCtrl', MainCtrl);

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

})();

/**
 * Created by szaharov on 28/05/15.
 */

angular.module('ngFit.about', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about',{
            templateUrl:'app/components/about/about.html',
            controller: 'AboutCtrl'
        });
}])

.controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.title = "This is scope title About";
}])

angular.module('ngFit.contact', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/contact',{
        templateUrl:'app/components/contact/contact.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', ['$scope', function ($scope) {
    $scope.title = "This is scope title Contact";
}])
angular.module('ngFit.navbar', ['ngRoute'])

//.config(['$routeProvider', function ($routeProvider) {
//    SrouteProvider.when
//}])

//.controller('NavbarCtrl',['$scope', function() {
//
//    }])
