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

      var columnDefs = [
        {headerName: "Make", field: "make", width: 50},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
      ];

      var rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
      ];

      $ctrl.gridOptions = {
        overlayLoadingTemplate: '<div class="ag-overlay-loading-center">' +
          '<div class="ag-overlay-loader"></div>' +
          '<span>Loading...</span>' +
          '</div>',
        columnDefs: columnDefs,
        rowData: rowData
      };
      setTimeout(()=> $ctrl.gridOptions.api.sizeColumnsToFit(), 0);
    }
  ]);
