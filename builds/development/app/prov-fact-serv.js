///var myApp = angular.module('myApp', []);
///
///factory, service, value, constant — всего лишь синтаксический сахар для provider
/////service style, probably the simplest one
///myApp.service('helloWorldFromService', function() {
///    this.sayHello = function() {
///        return "Hello, World!"
///    };
///});
///
/////factory style, more involved but more sophisticated
///myApp.factory('helloWorldFromFactory', function() {
///         ///private
///     что-нить (к этим переменным мы никогда не достучимся(не так как в провайдере, где можно переменную подменить на этапе конфига))
///    return { // здесь уже все public
///        sayHello: function() {
///            return "Hello, World!"
///        }
///    };
///});
///
/////provider style, full blown, configurable version
///myApp.provider('helloWorld', function() {
///
///    this.name = 'Default';
///
///    this.$get = function() {
///        var name = this.name;
///        return {
///            sayHello: function() {
///                return "Hello, " + name + "!"
///            }
///        }
///    };
///
///    this.setName = function(name) {
///        this.name = name;
///    };
///});
///
/////hey, we can configure a provider!  ///через config мы можем обратиться к приватной части провайдера(та которая НЕ $get)
///myApp.config(function(helloWorldProvider){
///    helloWorldProvider.setName('World');
///});
///
///
///function MyCtrl($scope, helloWorld, helloWorldFromFactory, helloWorldFromService) {
///
///    $scope.hellos = [
///        helloWorld.sayHello(),
///        helloWorldFromFactory.sayHello(),
///        helloWorldFromService.sayHello()];
///}

///<div ng-controller="MyCtrl">
///{{hellos}}
///</div>