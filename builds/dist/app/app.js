// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact'
        ])
        .config(Config)
        .value('some_val', 'this is some wow')

    Config.$inject = ['$routeProvider', '$locationProvider', '$logProvider'];


    function Config($routeProvider, $locationProvider, $logProvider) {
        $routeProvider.
            otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(false);
        //$logProvider.debugEnable(true);

    }

})();

;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute'])
        .config(['$routeProvider', config])
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log', 'some_val'];

    function AboutCtrl($scope, $rootScope, $log, some_val){
        var vm = this;
        $rootScope.curPath = 'about';
        some_val = 'about';
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

    ContactCtrl.$inject = ['$scope', '$rootScope', '$log', 'some_val'];
    
    function ContactCtrl($scope, $rootScope, $log, some_val){
        var vm = this;
        $rootScope.curPath = 'contact';
        vm.some = some_val;
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

angular
    .module('ngFit.main', ['ngRoute'])
    .config(configMain)
    .constant('FIREBASE_URL', 'aaaaaaaaaaa')    
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$rootScope', '$log', 'FIREBASE_URL', 'some_val'];

function MainCtrl($scope, $rootScope, $log, FIREBASE_URL, some_val){
    $log.debug('MainCtrl start');

    $log._first = 'First property';
    $log.log($log);
    var VM = this;

    $rootScope.curPath = 'main';
   
    VM.url = FIREBASE_URL;
    VM.title = 'This is hello\'s page';
    VM.name = 'Aliot';
    $scope.clickFunction = function(name){
        alert('Hi, ' + name);
    };

    $log.debug('MainCtrl finish');
}

configMain.$inject = ['$routeProvider', 'FIREBASE_URL'];

function configMain($routeProvider, FIREBASE_URL){
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
