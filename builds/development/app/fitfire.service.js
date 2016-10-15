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
        //};
        
        refObj.$loaded(function(){
            self.dbObj = refObj;
        });        

        refArr.$loaded(function(){
            self.dbArr = refArr;
        });

        this.addUser = function(_user){
            var usersLength = $firebaseObject(ref.child('options').child('usersLength'));
            usersLength.$loaded(function(){
                var uLength = usersLength.$value++;
                usersLength.$save();
                userRef.child(uLength).set(_user);
            })

        }
        console.log(refArr);
    }


})();
