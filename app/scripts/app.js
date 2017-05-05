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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
