angular.module('ngFit.contact', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/contact',{
        templateUrl:'app/contact/contact.html',
        controller: 'ContactCtrl'
    });
}])

.controller('ContactCtrl', ['$scope', function ($scope) {
    $scope.title = "This is scope title Contact";
}])