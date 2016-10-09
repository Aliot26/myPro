(function(){
   "use strict";
///    В грубой форме описать можно так...
///    Service - синглтон, создает Service Factory
///    Service Factory - функция, которая в свою очередь создает Service Provider
///    Service Provider - функция-конструктор, которая при инициализации должна содержать свойство $get, которое содержит функцию Service Factory.
///    Когда идет запрос на сервис, то $injector(ответственный за поиск корректного service provider) создает его экземпляр и вызывает метод $get.
///    Так value доступно только сервису, провайдеру недоступно. А вот constant доступен и тому и другому. Но константа не декорируется

angular
    .module('ngFit.main', ['ngRoute'])
    .config(configMain)
    .constant('FIREBASE_URL', 'aaaaaaaaaaa')    
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL'];

function MainCtrl($scope, $rootScope, $log, FIREBASE_URL){
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