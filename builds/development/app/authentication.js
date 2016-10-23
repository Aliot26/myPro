;(function(){
    'use strict';

    angular.module('Authentication', [
        'firebase'
    ])
    .factory('authentication', AuthenticationFactory);

    function AuthenticationFactory($firebaseAuth, $rootScope, FIREBASE_URL, $log) {

        var ref = firebase.database().ref();

        var auth = firebase.auth();




        //function authHndl(error, authData) {
        //    if(error){
        //        console.log("login failed!", error);
        //    }else{
        //        console.log("Authenticated successfully", authData);
        //    }
        //}

        var authObj = {

            login:function(_user){
                //console.log(_user);
               // authHndl = typeof authHndl !== 'undefined' ? authHndl : authHndl;

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
                var user = firebase.auth().currentUser;
                var email;
                if(user != null){
                    email = user.email;
                    return email;
                }else{
                    return null;
                }

                //auth.onAuthStateChanged(function(user) {
                //    if (user) {
                //        // User signed in!
                //        var uid = user.uid;
                //        var email = user.email;
//
                //        console.log(user);
                //        console.log(email);
                //        console.log(uid);
                //    } else {
                //        // User logged out
                //    }
//
                //});//return email;
            }
        };

        $rootScope.signedIn = function () {
            return authObj.signedIn();
        };

        return authObj;
    }
})();
