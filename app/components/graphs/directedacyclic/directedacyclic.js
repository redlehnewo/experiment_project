/**
 * Created by owen on 5/7/15.
 */
angular.module('myapp.dag',['myapp.nodeModal'])
    .controller('dagCtrl', function($scope, $modal, $timeout, modalService, MockServerModel, SurveyGraph, VisDefaultOptions, VisBarnesHutOptions, VisDataSet){

        var la = new VisDataSet();

        function runOnce(){
            $scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();

            $scope.loadCoppaSample = function() {
                $scope.clearGraph();
                SurveyGraph.get(function success(graph){
                    if(graph) {
                        function drawEdges () {
                            graph.edges && graph.edges.length && graph.edges.each(function(edge) {
                                $timeout(function() { $scope.edges.add(edge) }, Number.random(100,200));
                            });
                        }
                        graph.nodes && graph.nodes.length && graph.nodes.each(function(node){
                            $timeout(function() {
                                $scope.nodes.add(node);
                                if($scope.nodes.length == graph.nodes.length) {
                                    drawEdges();
                                }
                            }, Number.random(500,1000));
                        });
                    }
                });
            }

            $scope.clearGraph = function() {
                $scope.nodes.clear();
                $scope.edges.clear();
            }
        }

        runOnce();
    })

    .config(function($stateProvider){
        $stateProvider.state('myapp.dag', {
            url : 'graphs/dag',
            templateUrl : 'components/graphs/directedacyclic/directedacyclic.html',
            controller : 'dagCtrl'
        });
    });
