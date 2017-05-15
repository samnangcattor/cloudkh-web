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
        getUser: function(id) {
          return CloudKhApiClient.get('/users/' + id).then(function(response) {
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
