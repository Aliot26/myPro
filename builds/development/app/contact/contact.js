;(function(){
    "use strict";

    angular
        .module('ngFit.contact', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$scope', '$rootScope', '$log', '$timeout'];
    
    function ContactCtrl($scope, $rootScope, $log, $timeout){
        var vm = this;
        $rootScope.curPath = 'contact';
        $log.log('contact');
        //$log._first = 'second property';
        //$log.log($log);

        vm.message = '';

        $scope.$watch('vm.message', function (newVal, oldVal) {
            console.log('$watch');
            console.log('newVal', newVal);
            console.log('oldVal', oldVal);
        });

        $scope.$on('init', function (event, data) {
            console.log('contact init event', event, data);
            vm.message = data;
        });

        $timeout(function () {
            vm.message = "Hello!";
        }, 3000);

        //setTimeout(function () {
        //    $scope.$apply(function () {
        //        vm.message = "Hello!";
        //    })
        //}, 3000)
        //  используется apply чтобы обнаруживать изменения появляющиеся благодаря setTimeout
    }

    function config($routeProvider) {
            $routeProvider
                .when('/contact', {
                    templateUrl: 'app/contact/contact.html',
                    controller: 'ContactCtrl',
                    controllerAs: 'vm'
                });
    }
})();