/**
 * Created by owen on 5/15/15.
 */
angular.module('myapp.nodeModal',[])
    .controller('nodeModalCtrl', function($scope, $modalInstance, nodeInstance){
        $scope.node = angular.copy(nodeInstance) || {};
        //Object.merge($scope.node, nodeInstance, true);
        $scope.addNode = function() {
            $modalInstance.close($scope.node);
        }
    })
    .config(function(modalServiceProvider) {
        modalServiceProvider.modal('node', {
            templateUrl: 'components/graphs/directedacyclic/node-modal.html',
            controller: 'nodeModalCtrl',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });
    })