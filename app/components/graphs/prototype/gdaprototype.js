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
                    initiallyActive: true
                    , addNode : false
                    , addEdge : function (data, callback) {
                        if (data.from == data.to)
                            return;

                        var from = $scope.nodes.get(data.from);
                        var to = $scope.nodes.get(data.to);

                        var modalInstance = $modal.open({
                            templateUrl: 'components/graphs/directedacyclic/edge-modal.html',
                            controller: 'edgeModalCtrl',
                            size: 'lg',
                            resolve: {
                                instance: function () { return data; }
                                , from  : function() { return from; }
                                , to : function() { return to; }
                            }
                        });
                        modalInstance.result.then(function success(edge) {
                            edge.dashes = (edge.type === 'sequence');
                            callback(edge); // needed to update the graph\
                        });
                    }
                    , editEdge : false
                },
                interaction : {
                    multiselect : true
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
