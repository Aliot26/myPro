;(function(){
    "use strict";

    angular
        .module('ngFit.contact', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('ContactCtrl', ContactCtrl)
        .directive('exampler', exampler)
        .directive('strength', strength)
        .directive('speed', speed)
        .directive('flight', flight)
        .directive('newDirective', newDirective)
        .directive('leave', leave);

    ContactCtrl.$inject = ['$scope', '$rootScope', '$log', '$timeout'];

    function strength () {
        return{
            require: "exampler", 
            link: function (scope, element, attrs, examplerCtrl) {
                examplerCtrl.addStrength();
            }
        }
    }

    function speed () {
        return{
            require: "exampler",
            link: function (scope, element, attrs, examplerCtrl) {
                examplerCtrl.addSpeed();
            }
        }
    }

    function flight () {
        return{
            require: "exampler",
            link: function (scope, element, attrs, examplerCtrl) {
                examplerCtrl.addFlight();
            }
        }
    }

    function newDirective () {
        return{            
            link: function (scope, element, attrs) {
                element.bind('mouseenter', function () {
                    element.addClass('panel');
                })
            }
        }
    }

    function leave () {
        return{
            link: function (scope, element, attrs) {
                element.bind('mouseleave', function () {
                    element.removeClass('panel');
                })
            }
        }
    }

    function exampler(){
        return{
            restrict : 'A',
            scope : {},
            controller: function ($scope) {
                $scope.abilities = [];

                this.addStrength = function () {
                    $scope.abilities.push('strength');
                };
                this.addSpeed = function () {
                    $scope.abilities.push('speed');
                };
                this.addFlight = function () {
                    $scope.abilities.push('flight');
                };
            },
            link: function (scope, element) {
                element.addClass('btn btn-raised btn-primary');
                element.bind('mouseenter', function () {
                    console.log(scope.abilities);
                })
            }
        }
    }

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