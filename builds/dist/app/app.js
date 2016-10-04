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

angular.module('ngFit.main', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'app/components/.html',
        controller: 'MainCtrl'
    })
}])

.controller('MainCtrl',
    ['$scope', function ($scope) {
        $scope.title = 'Hello page';
        $scope.name = 'Mnya';
        $scope.clickFunction = function (name) {
        alert('Hi,' + name);
        }
    }])
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
