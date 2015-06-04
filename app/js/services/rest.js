/**
 * Created by owen on 5/20/15.
 */
angular.module('myapp.restServices',['ngResource'])
    .factory('Phones', function($resource, ENV){
        return $resource(ENV.apiEndpoint + "phones/:id");
    })

    .factory('SurveyGraph', function($resource, ENV){
        return $resource("/surveygraph/:id");
    });