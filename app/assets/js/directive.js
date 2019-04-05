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

    .directive('indexSideBarMember', function () {
        return {
            templateUrl: 'view/components/index/index-side-bar-member.html',
            restrict: 'EA'
        }
    })

    .directive('indexSideBarAdmin', function () {
        return {
            templateUrl: 'view/components/index/index-side-bar-admin.html',
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
    })

    .directive('modalWarehouse', function () {
        return{
            templateUrl: 'view/components/index/modal-warehouse.html',
            restrict: 'EA'
        }
    });