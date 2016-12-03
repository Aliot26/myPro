;(function(){
    'use strict';

    angular
        .module('myBlog.fitfire.service', ['firebase'])
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
        
        this.getData = function (_st, _len) {
            return $firebaseArray(
                ref.child('data')
                    .orderByKey()
                    .startAt(_st)
                    .limitToFirst(_len)
            ).$loaded();
        }
    }


})();
