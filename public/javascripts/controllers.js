var myApp= angular.module('myApp',['ngResource']).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          when('/',
          {templateUrl: '/index.html', controller: 'MainCtrl'}).
          when('/prasangs',
          {templateUrl: '/prasangs.html', controller: 'SportsCtrl'}).
          when('/players',
          {templateUrl: '/js/views/players.html', controller: 'PlayersCtrl'}).
          otherwise({redirectTo: '/'});
    }]);

myApp.controller('AppCtrl',['$scope','$http', function ($scope,$http) {
    console.log("App Controller!");

    $http.get('/contactList').success(function(response){
      console.log("I got the data");
      $scope.contactList = response;
    });

}]);

myApp.controller('PrasangCtrl',['$scope','$http', function ($scope,$http) {
  console.log("App Controller!");

  $http.get('/prasangs').success(function(response){
    console.log("I got the data");
    $scope.prasangList = response;
  });

}]);

myApp.directive('footer', function () {
  return {
    restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: true,
    templateUrl: "directive/footer.html",
    controller: ['$scope', '$filter', function ($scope, $filter) {
      // Your behaviour goes here :)
    }]
  }
});