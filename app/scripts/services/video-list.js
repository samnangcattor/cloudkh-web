'use strict';

/**
 * @ngdoc service
 * @name cloudWebApp.VideoListService
 * @description
 * VideoListService
 * Service in the cloudWebApp.
 */
angular.module('cloudWebApp')
  .service('VideoListService', [
    'Videos',
    function(
      Videos
    ) {
      var $ctrl = this;
      var params;

      function searchVideos(params) {
        return Videos.search(params).then(function(responses) {
          return responses;
        });
      }

      $ctrl.search = function(page) {
        params = {
          page: page,
          all: true
        };

        return searchVideos(params).then(function(responses) {
          return responses;
        });
      };
  }]);
