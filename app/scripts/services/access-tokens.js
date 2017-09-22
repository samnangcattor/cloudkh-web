'use strict';

/*
*
* @ngdoc service
* @name cloudWebApp.AccessTokens
* @description
* AccessTokens
* Service in the cloudWebApp.
*/
angular.module('cloudWebApp')
  .service('AccessTokens', [
      'CloudKhApiClient',
    function(
      CloudKhApiClient
    ) {
      return {
        get: function() {
          return CloudKhApiClient.get('/access_tokens').then(function(response) {
            return response.data;
          });
        }
      }
    }
  ]);
