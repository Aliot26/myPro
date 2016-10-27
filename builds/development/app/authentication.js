;(function(){
    'use strict';

    angular.module('Authentication', [
        'firebase'
    ])
    .factory('authentication', AuthenticationFactory);

    function AuthenticationFactory($firebaseAuth, $rootScope, FIREBASE_URL, $log, $firebaseObject) {

        var ref = firebase.database().ref();

        function authDataCallback() {
            var user = auth.currentUser;
            var uid;
            if(user != null){
                uid = user.uid;
                console.log(user);
                var userref = ref.child('users').child(uid);
                var nam = $firebaseObject(userref);
                //var nameGuest = nam.firstname;
                console.log(nam);
                nam.$loaded().then(function () {
                    $rootScope.currentUser = nam;
                });
            }else{
                $rootScope.currentUser = null;
            }
        }



        var auth = firebase.auth();

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
                auth.onAuthStateChanged(function(user) {
                    if (user) {
                        console.log('User is signed in.');
                        // User is signed in.
                    } else {
                        console.log('No user is signed in.');
                        // No user is signed in.
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
