/**
 * Created by owen on 6/22/15.
 */
(function(){
    angular.module('myapp.questionblockvisdatamapper',['ngVis'])
        .factory('QuestionBlockVisDataMapper', function(VisDataSet){
            var instance = {
                map : map
            }
            return instance;

            //////////////////////

            function map (data) {
                var _result = [];
                data.each(function(n){
                    var _res = angular.copy(n);

                    n.label = n.name; // map name property to label

                    _result.push(n);
                });
                return _result;
            }
        })
})();