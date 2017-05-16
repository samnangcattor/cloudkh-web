'use strict';

/*
*
* @ngdoc service
* @name cloudWebApp.Videos
* @description
* # Videos
* Service in the cloudWebApp.
*/
angular.module('cloudWebApp')
  .service('Videos', [
    'CloudKhApiClient',
    '$httpParamSerializerJQLike',
    function(
      CloudKhApiClient,
      $httpParamSerializerJQLike
    ) {
      return {
        search: function(params) {
          return CloudKhApiClient.get('/videos?' + $httpParamSerializerJQLike(params))
            .then(function(response) {
              return response.data;
          });
        }
      };
  }]);
