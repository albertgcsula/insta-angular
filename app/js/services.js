'use strict';

/* Services */

angular.module('myApp.services', [])
.factory('instagram', ['$http', function($http){
//instagram service, retrieves data from instagram api
    return {
		fetchImages: function(instagramUrl, callback){
            // retrives instagram url from controller
			$http.jsonp(instagramUrl).
                success(function(response){
                   callback(response.data);
                }).
                error(function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Server error!');
            });

		}
	}
}])
.value('version', '1.0.0');