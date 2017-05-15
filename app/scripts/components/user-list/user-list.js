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

      var columnDefs = [
        {headerName: "Id", field: "id", width: 20},
        {headerName: "Name", field: "name"},
        {headerName: "Create", field: "created_at"},
        {headerName: "Update", field: "updated_at"}
      ];

      $ctrl.gridOptions = {
        overlayLoadingTemplate: '<div class="ag-overlay-loading-center">' +
          '<div class="ag-overlay-loader"></div>' +
          '<span>Loading...</span>' +
          '</div>',
        columnDefs: columnDefs,
        rowData: null
      };

      Users.get().then(function(res) {
        $ctrl.gridOptions.api.setRowData(res);
      });

      setTimeout(()=> $ctrl.gridOptions.api.sizeColumnsToFit(), 0);
    }
  ]);
