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
      var $ctrl = this;
      $ctrl.items = ['#', 'Name', 'Action'];
      Users.get().then(function(users) {
        $ctrl.users = users;
      });
    }
  ]);
