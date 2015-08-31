(function() {
"use strict";

var app = angular.module("starter", ["ionic", "ngCordova" ])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller("MainController", [
    "$scope",
    "$cordovaGeolocation",
    function( 
        $scope,
        $cordovaGeolocation) {
        
        ionic.Platform.ready(function() {
            console.log("Getting current position.");

            var options = {
                enableHighAccuracy: true,
                timeout: 30000 // 30 seconds.
            };

            var onSuccess = function(position) {
                console.log("Success");
                console.log(position);

                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                $scope.$apply(); // We have to force a digest cycle.
            };

            var onError = function(error) {
                console.log(error.code + " => " + error.message);
                $scope.error = error.message;
                $scope.apply();
            };

            var q = $cordovaGeolocation.getCurrentPosition(options);

            q.then(onSuccess, onError);
                
        });
    }]);

}());
