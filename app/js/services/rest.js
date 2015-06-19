/**
 * Created by owen on 5/20/15.
 */
angular.module('myapp.restServices',['ngResource'])
    .factory('SurveyGraph', function($resource, ENV){
        return $resource("/surveygraph/:id");
    });