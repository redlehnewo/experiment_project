/**
 * Created by owen on 5/20/15.
 */
(function(){
    angular.module('myapp.mockBackend',['ngMockE2E'])
        .run(function($httpBackend, MockServerModel){

            // Survey Graphs
            $httpBackend.whenGET('/surveygraph').respond(MockServerModel.getGraph());

            $httpBackend.whenGET(/graphs\//).passThrough();
        });
})();
