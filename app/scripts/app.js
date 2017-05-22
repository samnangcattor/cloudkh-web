'use strict';

/**
 * @ngdoc overview
 * @name cloudWebApp
 * @description
 * # cloudWebApp
 *
 * Main module of the application.
 */
agGrid.initialiseAgGridWithAngular1(angular); // jshint ignore:line
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
    'agGrid',
    'ng-file-model',
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
        })
        .state('user', {
          url: '^/users/:userId',
          templateUrl: 'views/user.html',
          controller: 'UserCtrl',
          title: 'User Information'
        })
        .state('upload', {
          url: '^/upload',
          template: '<upload></upload>',
          title: 'Upload Video'
        })
        .state('videoList', {
          url: '/videolist',
          template: '<video-list></video-list>',
          title: 'Video List'
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

      $scope.menuVideo = [{
        action: function() { $scope.sideNavMenuClick('left', 'upload'); },
        title: 'Upload Video',
        icon: 'fa fa-plus-square'
      },{
        action: function() { $scope.sideNavMenuClick('left', 'videoList'); },
        title: 'Video List',
        icon: 'fa fa-list'
      }];
    }
  ]);
