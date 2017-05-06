'use strict';

 /**
  * @ngdoc service
  * @name cloudWebApp.CloudKhApiClient
  * @description
  * # CloudKhApiClient
  * Service in the cloudWebApp.
  */
 angular.module('cloudWebApp')
   .service('CloudKhApiClient', function ($http, Environments) {
     var apiUrl = Environments.apiUrl;
     return {
       get: function (path) {
         return $http.get(apiUrl + path);
       }
     }
   });
