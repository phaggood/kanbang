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


myapp.factory("kanbangRulesService", function(){
  // limit by

});

myapp.controller('HomeCtl', function($scope, KanbangService){
    $scope.colspan = "span4";
    $scope.priorites = [];
    $scope.extendedView = false;
    $scope.issues = {};
    $scope.searchtext = "";
    $scope.todoCount = 0;
    $scope.reviewCount = 0;
    $scope.progressCount = 0;

    var issuepromise = KanbangService.getIssues().then(function(resp) {
        $scope.issues = resp.data.issues;
	// should loop through statusnames here and assign to scope
        $scope.todoCount = $scope.issues.ctodo == undefined ? 0 : $scope.issues.ctodo.length;
        $scope.reviewCount = $scope.issues.cReview == undefined ? 0 : $scope.issues.cReview.length;
        $scope.progressCount = $scope.issues.cProgress == undefined ? 0 : $scope.issues.cProgress.length;
        $scope.closedCount = $scope.issues.cClosed == undefined ? 0 : $scope.issues.cClosed.length;
        // get priority list
        $scope.priorities = ["Major","Minor","Critical"];  // KanbangService.getPriorities($scope.issues);
    });

    $scope.clearSearch = function() {
        $scope.searchtext = "";
    }

    $scope.defaultView = function() {
        $scope.colspan = "span4";
        $scope.extendedView = false;
    };

    $scope.expandedView = function() {
        $scope.colspan = "span3";
        $scope.extendedView = true;
    };

    // move todo to inprogress
    $scope.startProgress = function(id){

    };

    // move projct from inprogress to review
    $scope.resolve = function(id) {

    };

});
