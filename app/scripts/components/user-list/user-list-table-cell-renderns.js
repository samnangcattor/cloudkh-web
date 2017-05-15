'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.UserListTableCellRenderns
 * @description
 * UserListTableCellRenderns
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp').
  service('UserListTableCellRenderns', [
    function(

    ) {
      var $ctrl = this;

      $ctrl.nameCellRenderer =  function(params) {
        return '<a href="users/' + params.data.id + '">' + params.data.name + '</a>';
      };
    }
  ]);
