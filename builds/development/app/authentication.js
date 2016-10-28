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
