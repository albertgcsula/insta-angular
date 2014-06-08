'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('SearchController', ['$rootScope', '$scope', 'instagram','$location', function($rootScope, $scope, instagram, $location) {

      $scope.getResults = function() {
          var hasError = false;
          var formSubmitted = false;
          var $fieldsToValidate = $("#search-form .has-validator");
          // instagram url to be contructed by input, default is popular
          var instagramUrl = 'https://api.instagram.com/v1/media/popular?client_id=599289ce136242f98cb101527d18360d&callback=JSON_CALLBACK';
          // make sure results view is shown
          $location.path('results');

          // prevent double submits before page load finishes
          if (formSubmitted) {
              return false;
          }

          if(!$scope.username && !$scope.hashtag) {
              var hasError = true;
              console.log(hasError);
          } 
          if($scope.username && !$scope.hashtag) {
              // run search for all instagram images with hastag
              $rootScope.searchterm = 'username '+$scope.username;

              instagramUrl = 'https://api.instagram.com/v1/users/search?q=' + $scope.username + '&client_id=599289ce136242f98cb101527d18360d&callback=JSON_CALLBACK';

              $rootScope.userResults = [];

              // call instagram service
              instagram.fetchImages(instagramUrl, function(data) {
                $rootScope.userResults = data;
                console.log(data);
              });

              // clear input text
              $scope.clearInput();
              //clear results
              $rootScope.userResults = [];
              $rootScope.hashtagResults = []

          }
          if(!$scope.username && $scope.hashtag) {
              // run search for instagram hashtag
              $rootScope.searchterm = '#'+$scope.hashtag;

              instagramUrl = 'https://api.instagram.com/v1/tags/' + $scope.hashtag + '/media/recent?client_id=599289ce136242f98cb101527d18360d&callback=JSON_CALLBACK';
              
              $rootScope.hashtagResults = [];

              // call instagram service
              instagram.fetchImages(instagramUrl, function(data){
                $rootScope.hashtagResults = data;
              });

              // clear input text
              $scope.clearInput();
              //clear results
              $rootScope.userResults = [];
              $rootScope.hashtagResults = []

              /* what is called from the service
              $http.jsonp(instagramUrl).
                success(function(response){
                  $rootScope.results = response.data;
                  console.log($rootScope.results);
                }).
                error(function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Server error!');
              });
              */
          } else if($scope.username || $scope.hashtag) {
              var hasError = false;
          }

          if (!hasError) {
              $("#sidebar-search .alert").html('').hide();
              // hide keyboard on mobile
              $('input#submit').blur();
              formSubmitted = true;
              return true;
          } else {
             $("#sidebar-search .alert").html('You must fill out one of the fields with a search term.').show();
             hasError = false;
             return false;
          }
      };

      $scope.clearResults = function(){
        //clear results
        $rootScope.userResults = [];
        $rootScope.hashtagResults = []
        $rootScope.searchterm = '';
      };

      $scope.clearInput = function(){
        // clear input text
        $scope.username = '';
        $scope.hashtag = '';
      };

  }]);