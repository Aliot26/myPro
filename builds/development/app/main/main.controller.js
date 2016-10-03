angular.module('ngFit.main', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'app/components/.hnml',
        controller: 'MainCtrl'
    })
}])

.controller('MainCtrl',
    ['$scope', function ($scope) {
        $scope.title = 'Hello page';
        $scope.name = 'Mnya';
        $scope.clickFunction = function (name) {
        alert('Hi,' + name);
        }
    }])