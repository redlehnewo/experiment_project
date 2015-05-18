/**
 * Created by owen on 5/19/15.
 */
angular.module('myapp.edgeModal',[])
    .controller('edgeModalCtrl', function($scope, $modalInstance, instance){
        $scope.edge = angular.copy(instance) || {};
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
    })
