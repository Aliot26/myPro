;(function(){
    'use strict';

    angular.module('Authentication', [
        'firebase'
    ])
    .factory('authentication', AuthenticationFactory);

    function AuthenticationFactory($firebaseAuth, $rootScope, FIREBASE_URL) {

        var ref = firebase.database().ref();

        var authObj = {
            login:function(_user){
                ref.authWithPassword(_user)
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
