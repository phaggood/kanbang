/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/17/13
 * Time: 7:42 AM
 * To change this template use File | Settings | File Templates.
 */

var app = angular.module("KanbangApp", ['ngResource']);

myApp.factory("KanbangService", function( $http) {
    var factory = {};
    factory.getIssues = function() {
        var issues =
            $http({
                method: 'GET',
                url: '/issues'
            });
        return issues;
    };
    return factory;
});

myapp.controller('HomeCtl', function($scope, KanbangService){
    $scope.todos = [];
    $scope.reviews = [];
    var issuepromise = KanbangService.getIssues().then(function(resp) {
        var issues = resp.data.issues;
        console.log(issues.ctodo.length);
	// should loop through statusnames here and assign to scope
        $scope.todos = issues.ctodo;
        $scope.reviews = issues.cReview;
    });
});

myApp.controller("ExtendedCtl", function($scope, KanbangService){
    //$scope.issues = KanbangService.query();
    //$scope.extrasets = ExtendedService.query();
});
