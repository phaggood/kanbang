/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/17/13
 * Time: 7:42 AM
 * To change this template use File | Settings | File Templates.
 */

var myapp = angular.module("KanbangApp", ['ngResource']).
   config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtl'});
        $routeProvider.when('/extended', {templateUrl: 'partials/extraview.html', controller: 'HomeCtl'});
        $routeProvider.otherwise({redirectTo: '/home'});
 }]);


myapp.factory("KanbangService", function( $http) {
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
    $scope.expandView = true;
    $scope.searchtext = "";
    $scope.todos = [];
    $scope.reviews = [];
    $scope.progresslist = [];
    $scope.todoCount = 0;
    $scope.reviewCount = 0;
    $scope.progressCount = 0;
    var issuepromise = KanbangService.getIssues().then(function(resp) {
        var issues = resp.data.issues;
        console.log("issueount " + issues.ctodo.length);
	// should loop through statusnames here and assign to scope
        $scope.todos = issues.ctodo;
        $scope.reviews = issues.cReview;
        $scope.progresslist = issues.cProgress;
        $scope.closeds = issues.cClosed;
        $scope.todoCount = issues.ctodo.length;
        $scope.reviewCount = issues.cReview.length;
        $scope.progressCount = issues.cProgress.length;
        $scope.closedCount = issues.closeds.length;
    });

    var clearSearch = function() {
        $scope.searchtext = "";
    }

});

myapp.controller("ExtendedCtl", function($scope, KanbangService){
    $scope.expandView = true;
    //$scope.issues = KanbangService.query();
    //$scope.extrasets = ExtendedService.query();
});
