'use strict';

/**
 * @ngdoc overview
 * @name cloudWebApp
 * @description
 * # cloudWebApp
 *
 * Main module of the application.
 */
angular
  .module('cloudWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'services.environments',
    'ui.router',
    'angular-loading-bar',
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .state('userList', {
          url: '/userlist',
          template: '<user-list></user-list>',
          title: 'User List'
        });
    }
  ])
  .controller('cloudKhMaterial', [
    '$scope',
    '$state',
    function(
      $scope,
      $state
    ) {
      $scope.callByMenu = function(action) {
        action();
      };

      $scope.sideNavMenuClick = function(menuId, target, attrs) {
        $state.go(target, attrs || {});
      };

      $scope.menuUser = [{
        action: function() { $scope.sideNavMenuClick('left', 'userList'); },
        title: 'User List',
        icon: 'fa fa-list'
      }];
    }
  ]);
