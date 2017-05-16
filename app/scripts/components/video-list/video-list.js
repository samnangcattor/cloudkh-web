'use strict';

/**
 * @ngdoc component
 * @name cloudWebApp.component:VideoList
 * @description
 * # VideoList
 */
angular.module('cloudWebApp')
  .component('videoList', {
    templateUrl: 'scripts/components/video-list/video-list.html',
    controller: 'VideoListCtrl'
  })
  .controller('VideoListCtrl', [
    'VideoListTableSettings',
    'VideoListService',
    function(
      VideoListTableSettings,
      VideoListService
    ) {
      var $ctrl = this;
      var page = 1;

      $ctrl.gridOptions = {
        overlayLoadingTemplate: '<div class="ag-overlay-loading-center">' +
          '<div class="ag-overlay-loader"></div>' +
          '<span>Loading...</span>' +
          '</div>',
        columnDefs: VideoListTableSettings.columnDefs,
        rowData: null,
        rowHeight: 28,
        pagination: true,
        suppressPaginationPanel: true
      };

      function loadVideos() {
        VideoListService.search(page).then(function(res) {
          $ctrl.gridOptions.api.setRowData(res.videos);
          $ctrl.lastPage = res.last_page;
          $ctrl.currentPage = res.current_page;
          $ctrl.total = res.video_total;
        });
      }

      $ctrl.onBtFirst = function() {
        page = 1;
        loadVideos();
      };

      $ctrl.onBtLast = function() {
        page = $ctrl.lastPage;
        loadVideos();
      };

      $ctrl.onBtPrevious = function() {
        if (page >= 2) {
          page -= 1;
          loadVideos();
        }
      };

      $ctrl.onBtNext = function() {
        if (page < $ctrl.lastPage) {
          page += 1;
          loadVideos();
        }
      };

      setTimeout(()=> $ctrl.gridOptions.api.sizeColumnsToFit(), 0);

      $ctrl.init = function() {
        loadVideos();
      };
  }]);
