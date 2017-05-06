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
  .service('Users', function(CloudKhApiClient) {
    return {
      get: function() {
        return CloudKhApiClient.get('/users').then(function(response) {
          return response.data;
        });
      }
    }
  });
