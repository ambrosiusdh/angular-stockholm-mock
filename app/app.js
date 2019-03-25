'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'myApp.view1',
    'myApp.view2',
    'myApp.view',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
controller('paginationCtrl',['$scope'], function ($scope) {

    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
})



//JQuery
var currExpandClass

function expandList (className) {
    if(currExpandClass === className) {
        $('.' + className + ' .list__menu').slideToggle()
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate')
    }else {
        $('.panel__menu').slideUp()
        $('.side-bar--expand').removeClass('side-bar--expand-rotate')
        $('.' + className + ' .list__menu').slideToggle()
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate')
    }
    currExpandClass = className
}