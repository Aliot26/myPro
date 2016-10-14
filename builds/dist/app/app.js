// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngFit.fitfire.service',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact'
        ])
        .config(Config)
        .constant('FIREBASE_URL', 'https://mypro-b3c3e.firebaseio.com');
        

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $logProvider.debugEnabled(true);

    }

})();

;(function(){
    'use strict';

    angular
        .module('ngFit.fitfire.service', ['firebase'])
        .service('fitfire', fitfire);
    
    fitfire.$inject = ['$log', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray'];
    
    function fitfire($log, FIREBASE_URL, $firebaseObject, $firebaseArray){
        var self = this;

        var ref = firebase.database().ref();
        var refObj = $firebaseObject(ref);
        var refArr = $firebaseArray(ref);

        var userRef = ref.child('user');
        var userArr = $firebaseArray(userRef);

        this.getUsers = function(){
            return userArr.$loaded(function(_data){
                return _data;
            })
        };
        
//$log.debug('rrrrrrrrrrr');
        
        refObj.$loaded(function(){
            self.dbObj = refObj;
        });        

        refArr.$loaded(function(){
            self.dbArr = refArr;
        });
        console.log(refObj);
        console.log(refArr);
    }


})();

;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function AboutCtrl($scope, $rootScope, $log){
        var vm = this;
        $rootScope.curPath = 'about';
        $log.log('about');
    }

    function config($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            });
    }


})();
;(function(){
    "use strict";

    angular
        .module('ngFit.contact', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.$inject = ['$scope', '$rootScope', '$log'];
    
    function ContactCtrl($scope, $rootScope, $log){
        var vm = this;
        $rootScope.curPath = 'contact';
        $log.log('contact');
        $log._first = 'second property';
        $log.log($log);
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
(function(){
   "use strict";
///    В грубой форме описать можно так...
///    Service - синглтон, создает Service Factory
///    Service Factory - функция, которая в свою очередь создает Service Provider
///    Service Provider - функция-конструктор, которая при инициализации должна содержать свойство $get, которое содержит функцию Service Factory.
///    Когда идет запрос на сервис, то $injector(ответственный за поиск корректного service provider) создает его экземпляр и вызывает метод $get.
///    Так value доступно только сервису, провайдеру недоступно. А вот constant доступен и тому и другому. Но константа не декорируется

angular
    .module('ngFit.main', ['ngRoute', 'firebase'])
    .config(configMain)
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'fitfire'];

function MainCtrl($scope, $rootScope, $log, fitfire){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    var VM = this;

    fitfire.getUsers().then(function(_data){
        VM.user = _data;
    });

    $rootScope.curPath = 'main';

    VM.title = 'This is hello\'s page';
    VM.name = 'Aliot';
    $scope.clickFunction = function(name){
        alert('Hi, ' + name);
    };

    $log.debug('MainCtrl finish');
}

configMain.$inject = ['$routeProvider'];

function configMain($routeProvider){
    $routeProvider.
        when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
    });
}

})();
;(function(){
    "use strict";

    angular
        .module('ngFit.navbar', [
                'ngRoute'
        ]);
})();



//.config(['$routeProvider', function ($routeProvider) {
//    SrouteProvider.when
//}])

//.controller('NavbarCtrl',['$scope', function() {
//
//    }])
