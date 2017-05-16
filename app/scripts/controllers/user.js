'use strict';

/**
 * @ngdoc function
 * @name cloudWebApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the cloudWebApp
 */
angular.module('cloudWebApp')
  .controller('UserCtrl', [
    '$stateParams',
    'Users',
    'Videos',
    '$scope',
    function (
      $stateParams,
      Users,
      Videos,
      $scope
    ) {
      var userId = $stateParams.userId;

      // Asynchronous data from server
      if (userId) {
        Promise.all([
          Videos.allByUser(userId),
          Users.getUser(userId)
        ]).then(function (results) {
          $scope.video = results[0].video;
          $scope.user = results[1];
        });
      }
  }]);
