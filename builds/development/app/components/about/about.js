angular.module('ngFit.about', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/about',{
            templateUrl:'app/components/about/about.html',
            controller: 'AboutCtrl'
        });
}])

.controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.title = "This is scope title About";
}])
