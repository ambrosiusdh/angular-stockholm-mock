'use strict'

angular.module('directiveApp', [])

    .directive('tablePagination', function () {
        return {
            templateUrl: 'view/components/table-pagination.html',
            restrict: 'EA'
        }
    })

    .directive('indexSideBar', function () {
        return {
            templateUrl: 'view/components/index/index-side-bar.html',
            restrict: 'EA'
        }
    })

    .directive('indexContentHead', function () {
        return{
            templateUrl: 'view/components/index/index-content-head.html',
            restrict: 'EA'
        }
    })

    .directive('indexContent', function () {
        return{
            templateUrl: 'view/components/index/index-content.html',
            restrict: 'EA'
        }
    });