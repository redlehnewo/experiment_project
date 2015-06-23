/**
 * Created by owen on 6/17/15.
 */
(function(){
    angular.module('myapp.gdaprototype',['myapp.questionblockvisdatamapper'])
        .controller('GdaPrototypeCtrl', function($scope, $log, $modal, $timeout, QuestionBlock, QuestionBlockVisDataMapper, MockServerModel, VisDataSet){

            $scope.controls = [];
            $scope.gates = [];
            $scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();

            $scope.visOptions   = getVisOptions;
            $scope.addNode      = addNode;
            $scope.addGate      = openQuestionBlockModal;
            $scope.onPageChange = onPageChange;

            $scope.pagination = {
                gates : { currentPage : 0, totalItems : 0, itemsPerPage : 5 }
                , controls : { currentPage : 0, totalItems : 0, itemsPerPage : 5 }
                , informative : { currentPage : 0, totalItems : 0, itemsPerPage : 5 }
            };

            runOnce();

            /////////////////////////////////////

            function addNode(node) {
                node.physics = false;
                node.isAdded = true;
                $scope.nodes.add(node);
            };

            function getVisOptions() {
                return {
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
                        , deleteNode : function (data, callback) {
                            // handle deletion gracefully
                            var node = $scope.nodes.get(data.nodes[0]);
                            var instance = (node.group == 'gates' ? $scope.gates : $scope.prescriptives).find(function(n){
                                return n.id == node.id;
                            });
                            $timeout(function(){
                                instance && (instance.isAdded = false);
                            }, 0);
                            callback(data);
                        }
                    }
                }
            }

            function openQuestionBlockModal(block) {
                var modalInstance = $modal.open({
                    templateUrl: 'components/prototype/questionblock-modal.html',
                    controller: 'QuestionBlockModalCtrl',
                    size: 'lg',
                    resolve: {
                        block: function () { return block; }
                    }
                });
                modalInstance.result.then(function (block) {
                    $scope.gates.push(block);
                });
            }

            function onPageChange(blockType) {

            }

            function runOnce() {
                var nodes = MockServerModel.getNodes();
                var nodemap = nodes.groupBy(function(n){return n.group});
                $scope.gates = nodemap.gates;
                $scope.prescriptives = nodemap.prescriptive;
            }
        })
        .config(function($stateProvider){
            $stateProvider.state('myapp.gdaprototype', {
                templateUrl : 'components/prototype/gdaprototype.html',
                controller : 'GdaPrototypeCtrl'
            });
        })
})();
