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

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
        ///$logProvider.debugEnable(true);
        
    }

})();

angular
    .module('ngFit.about', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about',{
            templateUrl:'app/about/about.html',
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
        templateUrl:'app/contact/contact.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', ['$scope', function ($scope) {
    $scope.title = "This is scope title Contact";
}])
(function(){
   "use strict";

angular
    .module('ngFit.main', ['ngRoute'])
    .config(configMain)
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log'];

function MainCtrl($scope, $rootScope, $log){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    $log.log($log);
    var vm = this;

    $rootScope.curPath = 'main';

    vm.title = 'This is hello\'s page';
    vm.name = 'Aliot';
    $scope.clickFunction = function(name){
        alert('Hi, ' + name);
    };

    $log.debug('MainCtrl finish');
};

configMain.$inject = ['$routeProvider'];

function configMain($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    });
};

})
angular.module('ngFit.navbar', ['ngRoute'])

//.config(['$routeProvider', function ($routeProvider) {
//    SrouteProvider.when
//}])

//.controller('NavbarCtrl',['$scope', function() {
//
//    }])
