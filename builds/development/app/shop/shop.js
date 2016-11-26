;(function() {
    'use strict';
    angular
        .module('ngFit.shop', ['ngRoute', 'ngFit.status'])
        .config(['$routeProvider', configShop])
        .controller('ShopCtrl', ShopCtrl)
        .factory('Son', function ($q) {
            var o ={};

            o.go2Shop = function () {
                var deferred = $q.defer();
                console.log(deferred);
                setTimeout(function () {
                    deferred.notify('I go to the shop' + new Date());

                }, 50);

                setTimeout(function () {
                    deferred.notify('I came to the shop' + new Date());

                    var eggs = parseInt(Math.random()*100);
                    if((eggs % 2)){
                        deferred.resolve(eggs);
                    }else{
                        deferred.reject('Shop is closed');
                    }
                },2000);
                return deferred.promise;
            };
            return o;
        });

    //ShopCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function ShopCtrl($scope, $rootScope, $log, Son, $q){
        var vm = this;
        $rootScope.curPath = 'shop';

        vm.sendSon = function () {
          $q.when(
              Son.go2Shop().then(
                  function (data) {
                      console.log('Cooking eggs from ' + data + ' eggs')
                  },
                  function (error) {
                      console.log('Do some burgers', error)
                  },
                  function (msg) {
                      console.log('Son say', msg)
                  }
              )
          ).then(function () {
            console.log('Son came home')
              })
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