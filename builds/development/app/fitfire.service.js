;(function(){
    'use strict';

    angular
        .module('ngFit.fitfire.service', ['firebase'])
        .service('fitfire', fitfire);
    
    fitfire.$inject = ['$log', 'FIREBASE_URL', '$firebaseObject', '$firebaseArray'];
    
    function fitfire($log, FIREBASE_URL, $firebaseObject, $firebaseArray){
        var self = this;

        var ref = firebase.database().ref();
        var refObj = $firebaseObject(ref);
        var refArr = $firebaseArray(ref);

        var userRef = ref.child('user');
        var userArr = $firebaseArray(userRef);

        this.getUsers = function(){
            return userArr.$loaded(function(_data){
                return _data;
            })
        };
        
//$log.debug('rrrrrrrrrrr');
        
        refObj.$loaded(function(){
            self.dbObj = refObj;
        });        

        refArr.$loaded(function(){
            self.dbArr = refArr;
        });
        console.log(refObj);
        console.log(refArr);
    }


})();
