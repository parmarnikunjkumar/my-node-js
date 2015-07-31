/**
 * Created by nirdosh on 28.07.15.
 */

var myapp = angular.module('myapp',['ngRoute']);

myapp.controller('mainController',function($scope){

  $scope.message = 'Welcome to our website!';
});

myapp.config(function($routeProvider){

  $routeProvider

    // route for the home page
      .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
      })

    // route for the about page
      .when('/about', {
        templateUrl : 'pages/about.html',
        controller  : 'aboutController'
      })

    // route for the contact page
      .when('/contact', {
        templateUrl : 'pages/contact.html',
        controller  : 'contactController'
      });
});

myapp.controller('aboutController', function($scope) {
  $scope.message = 'Look! I am an about page.';
});

myapp.controller('contactController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});