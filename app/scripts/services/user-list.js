'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.UserListService
 * @description
 *  UserListService
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp')
  .service('UserListService', [
    'Users',
    function (
      Users
    ) {
      var $ctrl = this;
      var params;

      function searchUsers(params) {
        return Users.search(params).then(function (response) {
          return response;
        });
      }

      $ctrl.search = function(page) {
        params = {
          page: page
        };

        return searchUsers(params).then(function (response) {
          return response;
        });
      };
    }
  ]);
