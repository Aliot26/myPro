(function(){
   "use strict";

angular
    .module('ngFit.main', ['ngRoute'])
    .config(configMain)
    .constant('FIREBASE_URL', 'aaaaaaaaaaa')    
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL', 'some_val'];

function MainCtrl($scope, $rootScope, $log, FIREBASE_URL, some_val){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    $log.log($log);
    var VM = this;

    $rootScope.curPath = 'main';
   
    VM.url = FIREBASE_URL;
    VM.title = 'This is hello\'s page';
    VM.name = 'Aliot';
    $scope.clickFunction = function(name){
        alert('Hi, ' + name);
    };

    $log.debug('MainCtrl finish');
}

configMain.$inject = ['$routeProvider', 'FIREBASE_URL'];

function configMain($routeProvider, FIREBASE_URL){
    $routeProvider.
        when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    });
}

})();