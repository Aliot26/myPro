window.onload = function(){$.material.init();};
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
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
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

        var provider = new firebase.auth.GoogleAuthProvider();

        var providerF = new firebase.auth.FacebookAuthProvider();

        var providerG = new firebase.auth.GithubAuthProvider();


        function getUid(){
            var user = auth.currentUser;
            //console.log(user, 'user');
            var uid= user.uid;
            var userRef = ref.child('users').child(uid);

            var nam = $firebaseObject(userRef);
            if(user != null){
                nam.$loaded().then(function () {
                    $rootScope.currentUser = nam;
                    //console.log(nam, 'doit!!');
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

            githubLogin : function () {
                auth.signInWithPopup(providerG).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    var name = result.user.displayName;
                    var photo = result.user.photoURL;
                    var id = result.user.uid;
                    //var credential = result.credential;
                    //console.log(credential, 'credential');
                    // get accessToken, idToken and provider
                    var userRef = ref.child('users').child(id);
                    userRef.set({
                        user: name,
                        photo: photo,
                        email: result.user.email
                    });
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            },

            facebookLogin : function () {
                auth.signInWithPopup(providerF).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    var name = result.user.displayName;
                    var photo = result.user.photoURL;
                    var id = result.user.uid;
                    console.log(user);
                    //var credential = result.credential;
                    //console.log(credential, 'credential');
                    // get accessToken, idToken and provider
                    var userRef = ref.child('users').child(id);
                    userRef.set({
                        user: name,
                        photo: photo,
                        email: result.user.email
                    });
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            },

            googleLogin: function () {
                auth.signInWithPopup(provider).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    var name = result.user.displayName;
                    var photo = result.user.photoURL;
                    var id = result.user.uid;
                    //var credential = result.credential;
                    //console.log(credential, 'credential');
                    // get accessToken, idToken and provider
                    var userRef = ref.child('users').child(id);
                    userRef.set({
                        user: name,
                        photo: photo,
                        email: result.user.email
                    });
                    //var ss = provider.addScope('https://www.googleapis.com/auth/plus.login');
                    //console.log(ss, 'ss');
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // The signed-in user info.
                    // ...
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            },

            logout: function(){
                auth.signOut().then(function() {
                    // Sign-out successful.
                    console.log('Sign-out successful.');
                }, function(error) {
                    // An error happened.
                    console.log('An error happened.');
                });
            },/*logout*/

           signedIn: function (){
               //console.log(auth.currentUser);
               //console.log(!auth.currentUser);
               //console.log(!!auth.currentUser);
               return !!auth.currentUser;
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
        .controller('AboutCtrl', AboutCtrl)
        .filter('withAge', function () {
            return function (input, limits) {
                var result = [];
                for(var i in input){
                    if(input[i].age > limits.min && input[i].age < limits.max){
                        result.push(input[i]);
                    }
                }
                return result;
            }
        })
        .filter('guest', function () {
            return function (input) {
                return input ? 'Customer' : 'Guest';
            }
    });

    AboutCtrl.$inject = ['$scope', '$rootScope', '$log'];

    function AboutCtrl($scope, $rootScope, $log, authentication){
        var vm = this;
        $rootScope.curPath = 'about';

        vm.people = [
            {
                "_id": "581a0e2cf2264aaec707269f",
                "index": 0,
                "isActive": true,
                "balance": "$3,393.67",
                "picture": "http://placehold.it/32x32",
                "age": 38,
                "eyeColor": "brown",
                "name": {
                    "first": "Rachel",
                    "last": "Morin"
                }
            },
            {
                "_id": "581a0e2c5c08552faa7082d5",
                "index": 1,
                "isActive": false,
                "balance": "$3,070.25",
                "picture": "http://placehold.it/32x32",
                "age": 37,
                "eyeColor": "blue",
                "name": {
                    "first": "Joan",
                    "last": "Hogan"
                }
            },
            {
                "_id": "581a0e2ceb256c87fc7d003b",
                "index": 2,
                "isActive": false,
                "balance": "$2,940.50",
                "picture": "http://placehold.it/32x32",
                "age": 27,
                "eyeColor": "brown",
                "name": {
                    "first": "Oconnor",
                    "last": "Gibson"
                }
            },
            {
                "_id": "581a0e2c3f9999e86907a5be",
                "index": 3,
                "isActive": false,
                "balance": "$1,854.44",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "green",
                "name": {
                    "first": "Frederick",
                    "last": "Nicholson"
                }
            },
            {
                "_id": "581a0e2c3eaa0f45af435487",
                "index": 4,
                "isActive": true,
                "balance": "$3,728.05",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "brown",
                "name": {
                    "first": "Berg",
                    "last": "Anthony"
                }
            },
            {
                "_id": "581a0e2caa647f4a1535ec0a",
                "index": 5,
                "isActive": false,
                "balance": "$2,089.04",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "brown",
                "name": {
                    "first": "Magdalena",
                    "last": "Rosario"
                }
            },
            {
                "_id": "581a0e2c4b641a62ec4739a5",
                "index": 6,
                "isActive": false,
                "balance": "$2,755.37",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "blue",
                "name": {
                    "first": "Maribel",
                    "last": "Riley"
                }
            },
            {
                "_id": "581a0e2c1d74d8abbd108c94",
                "index": 7,
                "isActive": false,
                "balance": "$3,989.74",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "green",
                "name": {
                    "first": "Cherry",
                    "last": "Dickerson"
                }
            },
            {
                "_id": "581a0e2cdc3fca39c2e064a5",
                "index": 8,
                "isActive": false,
                "balance": "$3,948.17",
                "picture": "http://placehold.it/32x32",
                "age": 24,
                "eyeColor": "brown",
                "name": {
                    "first": "Chandra",
                    "last": "Le"
                }
            },
            {
                "_id": "581a0e2c610a0bc173d76aec",
                "index": 9,
                "isActive": true,
                "balance": "$1,590.02",
                "picture": "http://placehold.it/32x32",
                "age": 20,
                "eyeColor": "blue",
                "name": {
                    "first": "Yates",
                    "last": "Compton"
                }
            },
            {
                "_id": "581a0e2c304aabc088b0d303",
                "index": 10,
                "isActive": false,
                "balance": "$3,597.83",
                "picture": "http://placehold.it/32x32",
                "age": 26,
                "eyeColor": "blue",
                "name": {
                    "first": "Brenda",
                    "last": "Hall"
                }
            },
            {
                "_id": "581a0e2cb841ec01a3a567d9",
                "index": 11,
                "isActive": false,
                "balance": "$1,290.63",
                "picture": "http://placehold.it/32x32",
                "age": 27,
                "eyeColor": "green",
                "name": {
                    "first": "Amie",
                    "last": "Acosta"
                }
            },
            {
                "_id": "581a0e2cad6919d7f1e65285",
                "index": 12,
                "isActive": true,
                "balance": "$1,772.89",
                "picture": "http://placehold.it/32x32",
                "age": 37,
                "eyeColor": "brown",
                "name": {
                    "first": "Eaton",
                    "last": "Pruitt"
                }
            },
            {
                "_id": "581a0e2c8bf0ee3daeafe2aa",
                "index": 13,
                "isActive": false,
                "balance": "$3,584.27",
                "picture": "http://placehold.it/32x32",
                "age": 36,
                "eyeColor": "blue",
                "name": {
                    "first": "Beatrice",
                    "last": "Peterson"
                }
            },
            {
                "_id": "581a0e2c0ed62223331351af",
                "index": 14,
                "isActive": true,
                "balance": "$2,390.03",
                "picture": "http://placehold.it/32x32",
                "age": 35,
                "eyeColor": "brown",
                "name": {
                    "first": "Warren",
                    "last": "Warren"
                }
            }
        ]

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
            };
            
            vm.googleLogin = function () {
                authentication.googleLogin();
            };

            vm.githubLogin = function () {
                authentication.githubLogin();
            };

            vm.facebookLogin = function () {
                authentication.facebookLogin();
            }
        }

        function StatusCtrl($scope, $log, authentication, $rootScope) {
            var vm = this;

            vm.getEmail = function () {                
                return authentication.getEmail();
            };
            
            vm.getUid = function(){
                if($rootScope.currentUser != null){
                console.log($rootScope.currentUser, "aaaa");
                return authentication.getUid;}
            };

            vm.logout = function(){
                authentication.logout();
            }
        }

})();




