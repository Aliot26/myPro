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

                //auth.onAuthStateChanged(function(user) {
                //    if (user) {
                //        // User signed in!
                //        var uid = user.uid;
                //        var email = user.email;
                //        console.log(uid);
                //        console.log(email);
                //    } else {
                //        // User logged out
                //    }
                //});
            },/*login*/

            logout: function(){
                auth.signOut();
            },/*logout*/

            signedIn: function () {
               return !!ref.getAuth();
            },/*signedIn*/

            getAuth: function(){
                return ref.getAuth();
            },/*getAuth*/

            getEmail: function () {
                auth.onAuthStateChanged(function(user) {
                    if (user) {
                        // User signed in!
                        var uid = user.uid;
                        var email = user.email;
                        //console.log(uid);
                        console.log(email);
                    } else {
                        // User logged out
                    }

                });//return email;
            }
        };

        $rootScope.signedIn = function () {
            return authObj.signedIn();
        }

        return authObj;
    }
})();
