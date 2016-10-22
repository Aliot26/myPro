;(function(){
    'use strict';

    angular.module('Authentication', [
        'firebase'
    ])
    .factory('authentication', AuthenticationFactory);

    function AuthenticationFactory($firebaseAuth, $rootScope, FIREBASE_URL, $log) {

        var ref = firebase.database().ref();

        function authHandle(error, authData) {
            if(error){
                console.log("login failed!", error);
            }else{
                console.log("Authenticated successfully", authData);
            }
        }
        var authObj = {

            login:function(_user){
                console.log(_user);

                //authHndl = typeof authHndl !== 'undefined' ? authHndl : authHandle;
                firebase.auth().signInWithEmailAndPassword(_user.email, _user.password)
                    .then(function (authData) {
                        $log.debug('logget in!', authData);
                    })
                    .catch(function (error) {
                        $log.error('Auth error', error);
                    })
            },/*login*/

            logout: function(){
                ref.unauth();
            },/*logout*/

            signedIn: function () {
               return !!ref.getAuth();
            },/*signedIn*/

            getAuth: function(){
                return ref.getAuth();
            }/*getAuth*/
        };

        $rootScope.signedIn = function () {
            return authObj.signedIn();
        }

        return authObj;
    }
})();
