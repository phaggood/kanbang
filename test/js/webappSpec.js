/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/21/13
 * Time: 8:25 PM
 * To change this template use File | Settings | File Templates.
 */

describe("Web App Tests", function() {

    // test controllers

    describe('HomeCtl tests', function() {
        var $scope = null;
        var ctrl = null;

        var mockTodos = [ { name:"todo1" }, {name:"todo2"}, {name:"todo3"} ];
        var mockReviews = [ { name:"review1" }, {name:"review2"}, {name:"review3"} ];
        var mockClosed = [ { name:"closed1" }, {name:"closed2"} ];
        var mockData = {};
        mockData.cTodos = mockTodos;
        mockData.cReviews = mockReviews;
        mockData.mockClosed = mockClosed;

        // mock services
        var mockService = {
            asyncGetIssues: function (){
                return mockData;
            }
        };

        //declare module
        beforeEach(module('KanbangApp'));

        /* setup scope and mockservices */
        beforeEach(inject(function($rootScope, $controller) {
            //create a scope object for us to use.
            $scope = $rootScope.$new();

            // HomeCtl has two injected services, scope and kanbanservice
            ctrl = $controller('HomeCtl', {
                $scope: $scope,
                kanbanService: mockService
            });
        }));

        /* Test defaultView */
        it('should be colspan:span4 and extendedView:false when defaultView() is called', function (){
            //set up.
            $scope.colspan = "";
            $scope.extendedView = false;

            //make the call.
            $scope.defaultView();

            //assert
            expect($scope.colspan).toEqual('span4');
            expect($scope.extendedView).toEqual(false);
        });

        /* Test expandedView()*/
        it('should be colspan:span3 and extendedView:true when expandedView() is called', function (){
            //set up.
            $scope.colspan = "";
            $scope.extendedView = false;

            //make the call.
            $scope.expandedView();

            //assert
            expect($scope.colspan).toEqual('span3');
            expect($scope.extendedView).toEqual(true);
        });

        /* Test clearSearch() */
        it('searchtext should be empty when clearSearch() is called', function (){
            //set up.
            $scope.searchtext = "Here is some text";
            expect($scope.searchtext.length).toEqual(17);

            //make the call.
            $scope.clearSearch();

            //assert
            expect($scope.searchtext.length).toEqual(0);
        });

        // http://www.benlesh.com/2013/05/angularjs-unit-testing-controllers.html

        it('test service separately, just test call return is correct', function (){
            //just make the call
            $scope.issues();

            //assert
            expect($scope.issues.length).toEqual(3);
        });

        /* Test 4b: Probably should test that the service method was
         * called as well. We'll use Jasmine's spyOn() method to do
         * this.
        it('should make a call to service.getIssues() in getIssues()', function (){
            //set up the spy.
            spyOn(mockService, 'getIssues').andCallThrough();

            //make the call!
            $scope.getIssues();

            //assert!
            expect(mockService.getIssues).toHaveBeenCalled();
        });  */

    });

    // test services
    describe('KanbangService tests', function (){
        var kbangService, $rootScope,
            httpBackend;

        //excuted before each "it" is run.
        beforeEach(function (){
            //load the module.
            module('KanbangApp');

            var cTodos = [ { name:"issue1" }, {name:"issue2"}, {name:"issue3"} ] ;
            var returnData = {};
            returnData.cTodos = cTodos;

            var deferred; // = $q.defer();

            // inject scope and promise
            inject(function(_$rootScope_, $q) {
                $rootScope = _$rootScope_;
                deferred = $q.defer();
                deferred.resolve(returnData);
            });

            //inject service
            inject(function($httpBackend,KanbangService) {
                kbangService = KanbangService;
                httpBackend = $httpBackend;
            });

            // create spy for getIssues service
            spyOn(kbangService, 'getIssues').andReturn(deferred.promise);

        });

        //clear out expectations (e.g. expectGET or expectPOST)
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        //check to see if it has the expected function
        it('should have a getIssues function', function () {
            expect(angular.isFunction(kbangService.getIssues)).toBe(true);
        });

        // mocked getIssues should return 3 objects
        it ('should return 3 issues and 1st issue name is issue1', function() {
            var result;

            kbangService.getIssues().then(function(returnFromPromise) {
                result = returnFromPromise;
            });

            $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
            expect(result.cTodos.length).toEqual(3);

            var firstIssue = result.cTodos[0].name;
            expect(firstIssue).toEqual("issue1");
        });
    });
});