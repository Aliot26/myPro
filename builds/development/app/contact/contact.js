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
        .directive('enter', enter)
        .directive('leave', leave)
        .directive('enter2', enter2)
        .directive('leave2', leave2)
        .directive('selectAwesome', selectAwesome);

    ContactCtrl.$inject = ['$scope', '$rootScope', '$log', '$timeout'];

    function selectAwesome () {
        return{
            restrict : 'A',
            scope: {
                selectAwesome: '=',
                title: "@"
            },
            transclude: true,
            templateUrl: 'app/contact/select.tpl.html',
            controller: function ($scope) {
                $scope.selectName = $scope.title;
            },
            link: function (scope, elem) {
                console.log(elem);
                elem.bind('mouseenter', function(){
                    console.log('MouseEnter');
                    elem.find('dropdown-menu').show();
                });
                elem.bind('mouseleave', function(){
                    console.log('MouseLeave');
                    elem.find('dropdown-menu').hide();
                });
                scope.$watch(elem.find('.option'), function () {
                    elem.find('.option').bind('mouseenter', function () {
                       console.log(angular.element(this).text());
                    })
                })
            }
        }
    }

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

    function enter () {
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

    function enter2 () {
        return{
            link: function (scope, element, attrs) {
                element.bind('mouseenter', function () {
                    element.addClass(attrs.enter2);
                })
            }
        }
    }

    function leave2 () {
        return{
            link: function (scope, element, attrs) {
                element.bind('mouseleave', function () {
                    element.removeClass(attrs.enter2);
                })
            }
        }
    }
    function exampler(){
        return{
            restrict : 'A',
            transclude: true,
            scope : {
                expression: '@',
                function: '&',
                dataBind: '='
            },
            template: '<h3>New directive</h3><ng-transclude></ng-transclude>',
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
        $scope.selectAttr = ['Not Awesome', 'Little Awesome', 'I\'m Awesome'];
        $scope.sendForm = function () {
            
        };
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