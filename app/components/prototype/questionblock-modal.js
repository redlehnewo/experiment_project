/**
 * Created by owen on 6/22/15.
 */
(function(){
    angular.module('myapp.questionblock-modal',[])
        .controller('QuestionBlockModalCtrl', function($scope, $modalInstance, block, QuestionBlock, AlertService){
            $scope.block    = angular.copy(block) || {};
            $scope.save     = save;

            //////////////////////////

            function save() {
                QuestionBlock.save($scope.save).$promise.then(function success(data){
                    $modalInstance.close(data);
                    AlertService.add('success','Saved successfully');
                });
            }

        });
})();