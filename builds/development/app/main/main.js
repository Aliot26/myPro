(function(){
   "use strict";
///    В грубой форме описать можно так...
///    Service - синглтон, создает Service Factory
///    Service Factory - функция, которая в свою очередь создает Service Provider
///    Service Provider - функция-конструктор, которая при инициализации должна содержать свойство $get, которое содержит функцию Service Factory.
///    Когда идет запрос на сервис, то $injector(ответственный за поиск корректного service provider) создает его экземпляр и вызывает метод $get.
///    Так value доступно только сервису, провайдеру недоступно. А вот constant доступен и тому и другому. Но константа не декорируется

angular
    .module('ngFit.main', ['ngRoute', 'firebase'])
    .config(configMain)
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray'];

function MainCtrl($scope, $rootScope, $log, FIREBASE_URL, $firebaseObject, $firebaseArray){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    var VM = this;

    $rootScope.curPath = 'main';

    var ref = firebase.database().ref();

    var refObj = $firebaseObject(ref);

    refObj.$loaded(function(){
        VM.dbObj = refObj;
    });
    console.log(refObj);

    var refArr = $firebaseArray(ref);

    refArr.$loaded(function(){
        VM.dbArr = refArr;
    });
    console.log(refObj);
    console.log(refArr);

    VM.title = 'This is hello\'s page';
    VM.name = 'Aliot';
    $scope.clickFunction = function(name){
        alert('Hi, ' + name);
    };

    $log.debug('MainCtrl finish');
}

configMain.$inject = ['$routeProvider'];

function configMain($routeProvider){
    $routeProvider.
        when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    });
}

})();