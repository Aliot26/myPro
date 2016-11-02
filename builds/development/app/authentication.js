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
