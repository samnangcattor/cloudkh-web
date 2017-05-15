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
    'UserListTableSettings',
    'UserListService',
    function (
      $scope,
      UserListTableSettings,
      UserListService
    ) {
      var $ctrl = this;
      var page = 1;
      $ctrl.lastPage = 1;
      $ctrl.currentPage = 1;

      $ctrl.gridOptions = {
        overlayLoadingTemplate: '<div class="ag-overlay-loading-center">' +
          '<div class="ag-overlay-loader"></div>' +
          '<span>Loading...</span>' +
          '</div>',
        columnDefs: UserListTableSettings.columnDefs,
        rowData: null,
        rowHeight: 28,
        pagination: true,
        suppressPaginationPanel: true
      };

      function loadUsers(params) {
        UserListService.search(page).then(function(res) {
          $ctrl.gridOptions.api.setRowData(res.users);
          $ctrl.lastPage = res.last_page;
          $ctrl.currentPage = res.current_page;
          $ctrl.total = res.user_total;
        });
      }

      $ctrl.onBtFirst = function() {
        page = 1;
        loadUsers(page);
      };

      $ctrl.onBtLast = function() {
        page = $ctrl.lastPage;
        loadUsers(page);
      };

      $ctrl.onBtPrevious = function() {
        if (page >= 2) {
          page -= 1;
          loadUsers(page);
        }
      };

      $ctrl.onBtNext = function() {
        if (page < $ctrl.lastPage) {
          page += 1;
          loadUsers(page);
        }
      };

      setTimeout(()=> $ctrl.gridOptions.api.sizeColumnsToFit(), 0);

      $ctrl.init = function() {
        loadUsers();
      };
    }
  ]);
