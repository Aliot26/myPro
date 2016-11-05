;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute', 'ngFit.status'])
        .config(['$routeProvider', configAbout])
        .controller('AboutCtrl', AboutCtrl)
        
        .filter('withEyes', function () {
            return function (input, eyes) {
                var result = [];
                angular.forEach(input, function (item) {
                    angular.forEach(eyes, function (selected, color) {
                        if(selected && color == item.eyeColor){
                            result.push(item);
                        }
                    })
                });
                return result;
            }
        })
        .filter('withAge', function () {
            return function (input, limits) {
                var result = [];
                for(var i in input){
                    if(input[i].age > limits.min && input[i].age < limits.max){
                        result.push(input[i]);
                    }
                }
                return result;
            }
        })
        .filter('guest', function () {
            return function (input) {
                return input ? 'Customer' : 'Guest';
            }
    });

    //AboutCtrl.$inject = ['$scope', '$rootScope', '$log', '$filter'];

    function AboutCtrl($scope, $rootScope, $log, authentication, $filter){
        var vm = this;
        $rootScope.curPath = 'about';

        vm.peopleBase = [
            {
                "_id": "581a0e2cf2264aaec707269f",
                "index": 0,
                "isActive": true,
                "balance": "$3,393.67",
                "picture": "http://placehold.it/32x32",
                "age": 38,
                "eyeColor": "brown",
                "name": {
                    "first": "Rachel",
                    "last": "Morin"
                }
            },
            {
                "_id": "581a0e2c5c08552faa7082d5",
                "index": 1,
                "isActive": false,
                "balance": "$3,070.25",
                "picture": "http://placehold.it/32x32",
                "age": 37,
                "eyeColor": "blue",
                "name": {
                    "first": "Joan",
                    "last": "Hogan"
                }
            },
            {
                "_id": "581a0e2ceb256c87fc7d003b",
                "index": 2,
                "isActive": false,
                "balance": "$2,940.50",
                "picture": "http://placehold.it/32x32",
                "age": 27,
                "eyeColor": "brown",
                "name": {
                    "first": "Oconnor",
                    "last": "Gibson"
                }
            },
            {
                "_id": "581a0e2c3f9999e86907a5be",
                "index": 3,
                "isActive": false,
                "balance": "$1,854.44",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "green",
                "name": {
                    "first": "Frederick",
                    "last": "Nicholson"
                }
            },
            {
                "_id": "581a0e2c3eaa0f45af435487",
                "index": 4,
                "isActive": true,
                "balance": "$3,728.05",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "brown",
                "name": {
                    "first": "Berg",
                    "last": "Anthony"
                }
            },
            {
                "_id": "581a0e2caa647f4a1535ec0a",
                "index": 5,
                "isActive": false,
                "balance": "$2,089.04",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "brown",
                "name": {
                    "first": "Magdalena",
                    "last": "Rosario"
                }
            },
            {
                "_id": "581a0e2c4b641a62ec4739a5",
                "index": 6,
                "isActive": false,
                "balance": "$2,755.37",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "blue",
                "name": {
                    "first": "Maribel",
                    "last": "Riley"
                }
            },
            {
                "_id": "581a0e2c1d74d8abbd108c94",
                "index": 7,
                "isActive": false,
                "balance": "$3,989.74",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "green",
                "name": {
                    "first": "Cherry",
                    "last": "Dickerson"
                }
            },
            {
                "_id": "581a0e2cdc3fca39c2e064a5",
                "index": 8,
                "isActive": false,
                "balance": "$3,948.17",
                "picture": "http://placehold.it/32x32",
                "age": 24,
                "eyeColor": "brown",
                "name": {
                    "first": "Chandra",
                    "last": "Le"
                }
            },
            {
                "_id": "581a0e2c610a0bc173d76aec",
                "index": 9,
                "isActive": true,
                "balance": "$1,590.02",
                "picture": "http://placehold.it/32x32",
                "age": 20,
                "eyeColor": "blue",
                "name": {
                    "first": "Yates",
                    "last": "Compton"
                }
            },
            {
                "_id": "581a0e2c304aabc088b0d303",
                "index": 10,
                "isActive": false,
                "balance": "$3,597.83",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "blue",
                "name": {
                    "first": "Brenda",
                    "last": "Hall"
                }
            },
            {
                "_id": "581a0e2cb841ec01a3a567d9",
                "index": 11,
                "isActive": false,
                "balance": "$1,290.63",
                "picture": "http://placehold.it/32x32",
                "age": 27,
                "eyeColor": "green",
                "name": {
                    "first": "Amie",
                    "last": "Acosta"
                }
            },
            {
                "_id": "581a0e2cad6919d7f1e65285",
                "index": 12,
                "isActive": true,
                "balance": "$1,772.89",
                "picture": "http://placehold.it/32x32",
                "age": 37,
                "eyeColor": "brown",
                "name": {
                    "first": "Eaton",
                    "last": "Pruitt"
                }
            },
            {
                "_id": "581a0e2c8bf0ee3daeafe2aa",
                "index": 13,
                "isActive": false,
                "balance": "$3,584.27",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "blue",
                "name": {
                    "first": "Beatrice",
                    "last": "Peterson"
                }
            },
            {
                "_id": "581a0e2c0ed62223331351af",
                "index": 14,
                "isActive": true,
                "balance": "$2,390.03",
                "picture": "http://placehold.it/32x32",
                "age": 35,
                "eyeColor": "brown",
                "name": {
                    "first": "Warren",
                    "last": "Warren"
                }
            }
        ];

        vm.people = $filter('withAge')(vm.peopleBase, {
            min : 30,
            max : 40
        });

        $log.log('about');
    }

    function configAbout($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
                //resolve: {
                //    'currentAuth': function (authentication) {
                //        return authentication.ngAuth().$requireSignIn();
                //    }
                //}
            });
    }


})();