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
    '$scope',
    function (
      $stateParams,
      Users,
      $scope
    ) {
      var userId = $stateParams.userId;
      // for user show
      if (userId) {
        Users.getUser(userId).then(function(data) {
          $scope.data = data;
        });
      }
  }]);
