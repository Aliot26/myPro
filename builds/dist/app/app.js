// initialize material design js
$.material.init();
(function(){
    'use strict';

    angular
        .module('ngFit', [
            'ngRoute',
            'ngCookies',
            'ngFit.fitfire.service',
            'Authentication',
            'ngFit.main',
            'ngFit.about',
            'ngFit.contact',
            'ngFit.status'
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

    angular.module('Authentication', [
        'firebase'
    ])
    .factory('authentication', AuthenticationFactory);

    function AuthenticationFactory($firebaseAuth, $rootScope, FIREBASE_URL, $log, $firebaseObject) {

        var ref = firebase.database().ref();

        var auth = firebase.auth();

        function getUid(){
            var user = auth.currentUser;
            console.log(user, 'user');
            var uid= user.uid;
            var userRef = ref.child('users').child(uid);
            //console.log(userRef, 'qqqqqqqqqqqqqqqqqqqq');
            var nam = $firebaseObject(userRef);
            if(user != null){
                //uid = user.uid;
                //console.log(user);
                //console.log(nam);
                nam.$loaded().then(function () {
                    $rootScope.currentUser = nam;
                    console.log(nam, 'doit!!');
                });
            }else{
                $rootScope.currentUser = null;
            }
        }


        auth.onAuthStateChanged(getUid);

       ///auth.onAuthStateChanged(function(user) {
       ///    if (user) {
       ///        // User signed in!
       ///        var uid = user.uid;
       ///    } else {
       ///        // User logged out
       ///    }
       ///});

        var authObj = {

            login:function(_user){

                auth.signInWithEmailAndPassword(_user.email, _user.password)
                    .then(function () {
                        $log.debug('logget in!');
                    })
                    .catch(function (error) {
                        $log.error('Auth error', error);
                    });                
            },/*login*/

            logout: function(){
                auth.signOut().then(function() {
                    // Sign-out successful.
                    console.log('Sign-out successful.');
                }, function(error) {
                    // An error happened.
                    console.log('An error happened.');
                });
            },/*logout*/

            signedIn: function () {

                auth.onAuthStateChanged(function(firebaseUser) {
                    if (firebaseUser) {
                        console.log('User is signed in.');
                        return firebaseUser;
                    } else {
                        console.log('No user is signed in.');
                        return null;
                    }
                });
            },/*signedIn*/





            //getAuth: function(){
            //    ////console.log(auth.getAuth())
            //    return auth.getAuth();
            //},/*getAuth*/

            getEmail: function () {
                var user = auth.currentUser;
                var email;
                if(user != null){
                    email = user.email;
                    return email;
                }else{
                    return null;
                }
            },

            ngAuth: function(){
                return auth;
            },
            
            register: function (_user) {
                 return auth.createUserWithEmailAndPassword(_user.email, _user.password)
                    .then(function (firebaseUser) {
                        $log.debug('User ' + firebaseUser.uid + ' created');
                        var userRef = ref.child('users').child(firebaseUser.uid);
                        userRef.set({
                            firstname: _user.firstname,
                            lastname: _user.lastname,
                            //date: firebase.ServarValue.TIMESTAMP,
                            email: _user.email
                        });
                       return auth.signInWithEmailAndPassword(_user.email, _user.password);
                    })
                    .catch(function (error) {
                        $log.error('Not created', error);
                    });
            }
        };

        $rootScope.signedIn = function () {
            return authObj.signedIn();
        };

        return authObj;
    }
})();

;(function(){
    'use strict';

    angular
        .module('ngFit.fitfire.service', ['firebase'])
        .service('fitfire', fitfire);
    
    fitfire.$inject = ['$log', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray', '$q'];
    
    function fitfire($log, FIREBASE_URL, $firebaseObject, $firebaseArray, $q){
        var self = this;

        var ref = firebase.database().ref();
        var refObj = $firebaseObject(ref);
        var refArr = $firebaseArray(ref);

        var userRef = ref.child('users');
        var userArr = $firebaseArray(userRef);

        this.getUsers = function(cb){
            return userArr.$loaded(cb)
        };
        
        //this.getUsers = function(cb){
        //    var deferred = $q.defer();
//
        //    var userArr = $firebaseArray(userRef);
//
        //    userArr.$loaded()
        //        .then(function(_data){
        //            deferred.resolve(_data);
        //        })
        //        .catch(function(error){
        //            deferred.reject(error);
        //        });
//
        //    return deferred.promise;
        //};            console.log('qaaaaaaa');


        refObj.$loaded(function(){
            self.dbObj = refObj;
        });

        refArr.$loaded(function(){
            self.dbArr = refArr;
        });

        this.addUser = function(_user){
            var usersLength = $firebaseObject(ref.child('options').child('usersLength'));
            usersLength.$loaded(function(){
                var uLength = ++usersLength.$value;
                usersLength.$save();
                userRef.child(uLength).set(_user);
            });
        };

        this.updateUser = function(_user){
            return userArr.$save(_user);
        };

        this.deleteUser = function(_user){
            return userArr.$remove(_user);
        };


    }


})();

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
;(function() {
    'use strict';
    angular
        .module('ngFit.about', ['ngRoute', 'ngFit.status'])
        .config(['$routeProvider', configAbout])
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function AboutCtrl($scope, $rootScope, $log, authentication){
        var vm = this;
        $rootScope.curPath = 'about';
        $log.log('about');
    }

    function configAbout($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'app/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm',
                //resolve: {
                //    'currentAuth': function (authentication) {
                //        return authentication.ngAuth().$requireSignIn();
                //    }
                //}
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
    var vm = this;

    $rootScope.curPath = 'main';

    vm.user = null;
    vm.title = 'This is hello\'s page';
    vm.name = 'Aliot';

    fitfire.getUsers(function(_data){
        vm.users = _data;
    });

    vm.addUser = function(){
        fitfire.addUser(vm.user);
        vm.resetEdit();
    };

    vm.setEdit = function(_user){
        vm.user = _user;
    };

    vm.resetEdit = function(){
        vm.user = {
            name : null,
            age : 0
        };
    };

    vm.updateUser = function(){
        fitfire.updateUser(vm.user).then(function(){
            vm.closeEdit();
        });
    };

    vm.closeEdit = function (){
        vm.user = null;
    };

    vm.deleteUser = function(){
        if(confirm("Really delete user?")){
            fitfire.deleteUser(vm.user).then(function(){
                vm.closeEdit()
            });
        };
    };

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
        .module('ngFit.status', [
                'ngRoute','Authentication'
        ])
        //.constant('SERVER_URL', 'http://localhost:8000/server.js')
        .controller('AuthCtrl', AuthCtrl)
        .controller('StatusCtrl', StatusCtrl)
        //.factory('Auth', AuthFactory);

        function AuthCtrl($scope, $log, authentication){
            var vm = this;

            vm.credentials = {
                email: null,
                password: null
            };
    
            vm.register = function () {
                authentication.register(vm.nUser);
            };

            vm.login = function(){
                authentication.login(vm.credentials);
            }
        }

        function StatusCtrl($scope, $log, authentication, $rootScope) {
            var vm = this;

            vm.getEmail = function () {                
                return authentication.getEmail();
            };
            
            vm.getUid = function(){
                console.log($rootScope.currentUser);
                return authentication.getUid;
            };

            vm.logout = function(){
                authentication.logout();
            }
        }

})();




