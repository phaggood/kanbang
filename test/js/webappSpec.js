/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/21/13
 * Time: 8:25 PM
 * To change this template use File | Settings | File Templates.
 */

describe("Web App Tests", function() {

    describe('KanbangService tests', function (){
        var kbangService, $rootScope,
            httpBackend;

        //excuted before each "it" is run.
        beforeEach(function (){

            //load the module.
            module('KanbangApp');

            //inject your service for testing.
            inject(function(KanbangService) {
                kbangService = KanbangService;
            });

            //get your service, also get $httpBackend
            //$httpBackend will be a mock, thanks to angular-mocks.js
            inject(function($httpBackend, KanbangService) {
                kbangService = KanbangService;
                httpBackend = $httpBackend;
            });

        });

        beforeEach(inject(function(_$rootScope_, $q) {
            $rootScope = _$rootScope_;

            var cTodos = [ { name:"issue1" }, {name:"issue2"}, {name:"issue3"} ] ;
            var returnData = {};
            returnData.cTodos = cTodos;

            var deferred = $q.defer();
            deferred.resolve(returnData); //  always resolved, you can do it from your spec

            spyOn(kbangService, 'getIssues').andReturn(deferred.promise);
        }));


        //make sure no expectations were missed in your tests.
        //(e.g. expectGET or expectPOST)
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        //check to see if it has the expected function
        it('should have a getIssues function', function () {
            expect(angular.isFunction(kbangService.getIssues)).toBe(true);
        });

        it ('should return 3 issues', function() {
            var result;

            kbangService.getIssues().then(function(returnFromPromise) {
                result = returnFromPromise;
            });

            $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
            //expect(result).toBe('somevalue');
            expect(result.cTodos.length).toEqual(3);
        });


        /*it('should return an array of issues in the response.', function (){
            //set up some data for the http call to return and test later.
            var cTodos = [ { name:"issue1" }, {name:"issue2"}, {name:"issue3"} ] ;
            var returnData = {};
            returnData.cTodos = cTodos;

            //expectGET to make sure this is called once.
            httpBackend.expectGET().respond(returnData);

            //make the call.
            var issueList = kbangService.getIssues();

            httpBackend.flush();

            expect(issueList.length).toEqual(3);

        });
          */
    });
});