'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.UserListTableSettings
 * @description
 * UserListTableSettings
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp')
  .service('UserListTableSettings', [
      'UserListTableCellRenderns',
    function (
      UserListTableCellRenderns
    ) {
      var $ctrl = this;

      $ctrl.columnDefs = [
        {
          headerName: "Id",
          field: "id",
           width: 20
        }, {
          headerName: "Name",
          field: "name",
          cellRenderer: UserListTableCellRenderns.nameCellRenderer,
        }, {
          headerName: "Create",
          field: "created_at"
        }, {
          headerName: "Update",
          field: "updated_at"
        }
      ];
    }
  ]);
