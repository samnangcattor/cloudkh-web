'use strict';

 /**
  * @ngdoc service
  * @name cloudWebApp.CloudKhApiClient
  * @description
  * # SenseApiClient
  * Service in the senseApp.
  */
 angular.module('cloudWebApp')
   .service('CloudKhApiClient', function ($http, Environments) {
     var apiUrl = Environments.apiUrl;
     return {
       get: function (path) {
         return $http.get(apiUrl, path);
       }
     }
   });
