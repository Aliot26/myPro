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