;(function() {
    'use strict';
    angular
        .module('ngFit.shop', ['ngRoute', 'ngFit.status'])
        .config(['$routeProvider', configShop])
        .controller('ShopCtrl', ShopCtrl);

    //ShopCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function ShopCtrl($scope, $rootScope, $log){
        var vm = this;
        $rootScope.curPath = 'shop';

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