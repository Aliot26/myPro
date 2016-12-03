;(function () {
    'use strict';
    angular
        .module('myBlog.shop', [
                        'ngRoute',
                        'myBlog.status',
                        'infinite-scroll',
                        'myBlog.fitfire.service'
        ])
        .config(['$routeProvider', configShop])
        .controller('ShopCtrl', ShopCtrl)
        .factory('Son', function ($q) {
            var o = {};

            o.go2Shop = function () {
                var deferred = $q.defer();
                //console.log(deferred);
                setTimeout(function () {
                    deferred.notify('I go to the shop ' + new Date());

                }, 50);

                setTimeout(function () {
                    deferred.notify('I came to the shop ' + new Date());

                    var eggs = parseInt(Math.random() * 100);
                    if ((eggs % 2)) {
                        deferred.resolve(eggs);
                    } else {
                        deferred.reject('Shop is closed');
                    }
                }, 2000);
                return deferred.promise;
            };

            o.go2GrandMa = function () {
                var deferred = $q.defer();
                //console.log(deferred);
                setTimeout(function () {
                    deferred.notify('I go to my Grandma ' + new Date());

                }, 100);

                setTimeout(function () {
                    deferred.notify('I came to my Grandma ' + new Date());

                    var eggs = parseInt(Math.random() * 100);
                    if ((eggs % 2)) {
                        deferred.resolve(eggs);
                    } else {
                        deferred.reject('She is not at home');
                    }
                }, 4000);
                return deferred.promise;
            };
            return o;
        });

    //ShopCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function ShopCtrl($scope, $rootScope, $log, Son, $q, fitfire) {
        var vm = this;
        $rootScope.curPath = 'shop';
        vm.hide = true;
        vm.sendSon = function () {
            var son1 = Son.go2Shop().then(
                function (data) {
                    console.log('Cooking eggs from ' + data + ' eggs')
                },
                function (error) {
                    console.log('Do some burgers', error)
                },
                function (msg) {
                    console.log('Son 1 say', msg)
                }
            );

            var son2 = Son.go2GrandMa().then(
                function (data) {
                    console.log('Good boy ' + data + '')
                },
                function (error) {
                    console.log('You will go to Granny later', error)
                },
                function (msg) {
                    console.log('Son 2 say', msg)
                }
            )
            $q.all([son1, son2] //  А1 Позволяет обезопасить программный код, часть А2 не выполниться пока не сделана часть А1(принимает либо promise либо обычное значение, а возвращает всегда promise) Т.е. принимается массив функций, которые будет запущены параллельно


            ).then(function () { // A2
                console.log('Chirdren came home')
            })
        };

        vm.datas = [];
        var last = 0;
        //fitfire.getData('' +last, 10).then(function (_data) {
        //    vm.datas = _data;
        //    last += 20;
        //});
        vm.loadMore = function () {
            fitfire.getData('' +last, 10).then(function (_data) {
                //First variant
                //for(var i in _data){
                //    if(typeof _data[i] === 'object' && _data[i].name){
                //        vm.datas.push(_data[i]);
                //    }
                //}
                //last += 20;
                //
                //second variant
                angular.forEach(_data, function (elem) {
                    vm.datas.push(elem);
                    last++;
                })
            });
        };

        $log.log('shop');
    }

    function configShop($routeProvider) {
        $routeProvider
            .when('/shop', {
                templateUrl: 'app/shop/shop.html',
                controller: 'ShopCtrl',
                controllerAs: 'vm'
                //resolve: {
                //    'currentAuth': function (authentication) {
                //        return authentication.ngAuth().$requireSignIn();
                //    }
                //}
            });
    }


})();