/**
 * Created by owen on 5/19/15.
 */
(function(){
    angular.module('myapp.edgeModal',[])
        .controller('edgeModalCtrl', function($scope, $modalInstance, instance, from, to){
            $scope.edge = angular.copy(instance) || {};
            $scope.from = angular.copy(from);
            $scope.to = angular.copy(to);
            $scope.onSubmit = function() {
                $modalInstance.close($scope.edge);
            }
        })
        .config(function(modalServiceProvider) {
            modalServiceProvider.modal('edge', {
                templateUrl: 'components/graphs/directedacyclic/edge-modal.html',
                controller: 'edgeModalCtrl',
                size: 'lg',
                backdrop: 'static',
                keyboard: false
            });
        });
})();

