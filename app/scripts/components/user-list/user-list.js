'use strict';

/**
 * @ngdoc component
 * @name cloudWebApp.component:UserList
 * @description
 * # UserList
 */
angular.module('cloudWebApp')
  .component('userList', {
    templateUrl: 'scripts/components/user-list/user-list.html',
    controller: 'UserListCtrl'
  })
  .controller('UserListCtrl', [
    '$scope',
    'Users',
    function (
      $scope,
      Users
    ) {
      Users.get().then(function(user) {
        console.log(user);
      });
    }
  ]);
