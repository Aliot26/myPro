(function(){
   "use strict";
///    В грубой форме описать можно так...
///    Service - синглтон, создает Service Factory
///    Service Factory - функция, которая в свою очередь создает Service Provider
///    Service Provider - функция-конструктор, которая при инициализации должна содержать свойство $get, которое содержит функцию Service Factory.
///    Когда идет запрос на сервис, то $injector(ответственный за поиск корректного service provider) создает его экземпляр и вызывает метод $get.
///    Так value доступно только сервису, провайдеру недоступно. А вот constant доступен и тому и другому. Но константа не декорируется

angular
    .module('myBlog.main', ['ngRoute', 'firebase'])
    .config(configMain)
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'fitfire'];

function MainCtrl($scope, $rootScope, $log, fitfire){
    $log.debug('MainCtrl start');
    var vm = this;

    $rootScope.curPath = 'main';

    vm.user = null;
    vm.title = 'This is hello\'s page';
    vm.name = 'Aliot';

    fitfire.getUsers(function(_data){
        vm.users = _data;
    });

    vm.addUser = function(){
        fitfire.addUser(vm.user);
        vm.resetEdit();
    };

    vm.setEdit = function(_user){
        vm.user = _user;
    };

    vm.resetEdit = function(){
        vm.user = {
            name : null,
            age : 0
        };
    };

    vm.updateUser = function(){
        fitfire.updateUser(vm.user).then(function(){
            vm.closeEdit();
        });
    };

    vm.closeEdit = function (){
        vm.user = null;
    };

    vm.deleteUser = function(){
        if(confirm("Really delete user?")){
            fitfire.deleteUser(vm.user).then(function(){
                vm.closeEdit()
            });
        };
    };

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