/**
 * Created by owen on 5/20/15.
 */
(function(){
    angular.module('myapp.restServices',['ngResource'])
        .factory('QuestionBlock', function($resource, ENV){
            return $resource(ENV.apiEndpoint+'questionblock/');
        })
        .factory('SurveyGraph', function($resource, ENV){
            return $resource(ENV.apiEndpoint+"/surveygraph/:id");
        });
})();
