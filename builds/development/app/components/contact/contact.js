angular.module('ngFit.contact', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/contact',{
        templateUrl:'app/components/contact/contact.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', ['$scope', function ($scope) {
    
}])