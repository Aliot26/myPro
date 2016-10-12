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
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL', '$firebaseObject'];

function MainCtrl($scope, $rootScope, $log, FIREBASE_URL, $firebaseObject){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    var VM = this;

    $rootScope.curPath = 'main';

    var config = {
        apiKey: "AIzaSyBSkxgKc7UlrH6wK7sK6v8nCA0WyLECKnU",
        authDomain: "mypro-b3c3e.firebaseapp.com",
        databaseURL: "https://mypro-b3c3e.firebaseio.com",
        storageBucket: "mypro-b3c3e.appspot.com",
        messagingSenderId: "1031068608485"
    };

    firebase.initializeApp(config);

    var rootRef = firebase.database().ref();
   
    var ref = new Firebase(FIREBASE_URL);
    var refObj = $firebaseObject(ref);

    refObj.$loaded(function(){
       VM.db = rootRef;
    });

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