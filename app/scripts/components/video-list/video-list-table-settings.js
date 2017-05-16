'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.VideoListTableSettings
 * @description
 * VideoListTableSettings
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp')
  .service('VideoListTableSettings', [
      'VideoListTableCellRenderns',
    function (
      VideoListTableCellRenderns
    ) {
      var $ctrl = this;

      $ctrl.columnDefs = [
        {
          headerName: "Title",
          width: 300,
          field: "title"
        }, {
          headerName: "Google File",
          width: 300,
          field: "google_file"
        }, {
          headerName: "Owner",
          field: "owner",
          cellRenderer: VideoListTableCellRenderns.ownerCellRenderer,
          width: 300
        }, {
          headerName: "Mime Type",
          field: "mime_type",
          width: 300
        }, {
          headerName: "Status",
          field: "status",
          width: 300
        }, {
          headerName: "Create",
          field: "created_at",
          width: 300
        }
      ];
    }
  ]);
