/**
 * Created by owen on 6/22/15.
 */
(function(){
    angular.module('myapp.gdaprototype')
        .directive('gdaQuestionBlockList', function(){
            return {
                restrict : 'AE'
                , replace : true
                , scope : {
                    blockList : '=',
                    onAddNode : '='
                }
                , templateUrl : 'components/prototype/questionblock-list.tmp.html'
                , link : function(scope, elem, attrs) {

                }
            }
        })
})();