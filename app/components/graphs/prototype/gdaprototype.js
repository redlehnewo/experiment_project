/**
 * Created by owen on 6/17/15.
 */
(function(){
    angular.module('myapp.gdaprototype',[])
        .controller('GdaPrototypeCtrl', function($scope, $log, $modal, $timeout, MockServerModel, VisDataSet){
            $scope.prescriptives = [];
            $scope.gates = [];
            $scope.nodes = new vis.DataSet();;
            $scope.edges = new vis.DataSet();;
            $scope.visOptions = {
                manipulation: {
                    initiallyActive: true,
                    addNode: function (data, callback) {
                        var modalInstance = $modal.open({
                            templateUrl: 'components/graphs/directedacyclic/node-modal.html',
                            controller: 'nodeModalCtrl',
                            size: 'lg',
                            resolve: {
                                nodeInstance: function () {
                                    return data;
                                }
                            }
                        });
                        modalInstance.result.then(function (node) {
                            node.physics = false;
                            node.fixed = { x: false, y: false};
                            callback(node); // needed to update the graph
                        });
                    },
                    addEdge: function (data, callback) {
                        if (data.from == data.to)
                            return;

                        var modalInstance = $modal.open({
                            templateUrl: 'components/graphs/directedacyclic/edge-modal.html',
                            controller: 'edgeModalCtrl',
                            size: 'lg',
                            resolve: {
                                instance: function () {
                                    return data;
                                }
                            }
                        });
                        modalInstance.result.then(function success(edge) {
                            callback(edge); // needed to update the graph\
                        });
                    }
                }
            }

            $scope.addNode = function addNode(node) {
                $log.log(node);
                node.physics = false;
                $scope.nodes.add(node);
            };

            function runOnce() {
                var nodes = MockServerModel.getNodes();
                var nodemap = nodes.groupBy(function(n){return n.group});
                $scope.gates = nodemap.gates;
                $scope.prescriptives = nodemap.prescriptive;
            }

            runOnce();
        })
        .config(function($stateProvider){
            $stateProvider.state('myapp.gdaprototype', {
                templateUrl : 'components/graphs/prototype/gdaprototype.html',
                controller : 'GdaPrototypeCtrl'
            });
        })
})();
