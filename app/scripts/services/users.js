'use strict';

/*
*
* @ngdoc service
* @name cloudWebApp.Users
* @description
* # Users
* Service in the cloudWebApp.
*/

angular.module('cloudWebApp')
  .service('Users', [
    'CloudKhApiClient',
    '$httpParamSerializerJQLike',
    function(
      CloudKhApiClient,
      $httpParamSerializerJQLike
    ) {
      return {
        get: function() {
          return CloudKhApiClient.get('/users').then(function(response) {
            return response.data;
          });
        },
        search: function(params) {
          return CloudKhApiClient.get('/users?' + $httpParamSerializerJQLike(params))
            .then(function(response) {
              return response.data;
          });
        }
      };
  }]);
