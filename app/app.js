'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.view1',
  'myApp.view2',
  'myApp.view',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])

//JQuery
var currExpandClass

function expandPanel (className) {
    if(currExpandClass === className) {
        $('.' + className + ' .panel__menu').slideToggle()
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate')
    }else {
        $('.panel__menu').slideUp()
        $('.side-bar--expand').removeClass('side-bar--expand-rotate')
        $('.' + className + ' .panel__menu').slideToggle()
        $('.' + className + ' .side-bar--expand').toggleClass('side-bar--expand-rotate')
    }
    currExpandClass = className
}