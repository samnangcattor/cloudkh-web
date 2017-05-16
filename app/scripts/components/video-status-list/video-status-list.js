'use strict';

/**
 * @ngdoc component
 * @name cloudWebApp.component:VideoStatusList
 * @description
 * # VideoStatusList
 */
angular.module('cloudWebApp')
  .component('videoStatusList', {
    templateUrl: 'scripts/components/video-status-list/video-status-list.html',
    bindings: {
      total: '<',
      done: '<',
      progress: '<',
      ban: '<'
    },
    controller: 'VideoStatusListCtrl'
  })
  .controller('VideoStatusListCtrl', [
    function(

    ) {
    }
  ]);
