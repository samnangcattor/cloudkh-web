'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.VideoListTableCellRenderns
 * @description
 * VideoListTableCellRenderns
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp').
  service('VideoListTableCellRenderns', [
    function(

    ) {
      var $ctrl = this;

      $ctrl.ownerCellRenderer =  function(params) {
        return '<a href="users/' + params.data.owner.id + '">' + params.data.owner.name + '</a>';
      };
    }
  ]);
