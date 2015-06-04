/**
 * Created by owen on 5/7/15.
 */
angular.module('myapp.dag',['myapp.nodeModal'])
    .controller('dagCtrl', function($scope, $modal, modalService, MockServerModel, SurveyGraph, VisDefaultOptions, VisBarnesHutOptions){

        function runOnce(){
            $scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();

            $scope.loadCoppaSample = function() {
                $scope.clearGraph();
                SurveyGraph.get(function success(graph){
                    if(graph) {
                        graph.nodes && $scope.nodes.add(graph.nodes);
                        graph.edges && $scope.edges.add(graph.edges);
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

    .constant('VisDefaultOptions', {
        width: '100%',
        height: '500px',
        autoResize : true,
        groups : {
            gates : {
                shape : 'diamond'
            }, prescriptive : {
                shape : 'box',
                color : '#CDFFC3'
            }
        }
    })

    .constant('VisBarnesHutOptions', {
        physics: {
            barnesHut: {
                gravitationalConstant: -146050
                , centralGravity: 1
                , springLength: 200
                , springConstant: 0.04
                , enabled : true
            }
        },
        configurePhysics : true
    })

    .directive('angularVis', function (VisDefaultOptions, $modal) {
        return {
            restrict : 'EA',
            replace : true,
            scope : {
                nodes : '=visNodes',
                edges : '=visEdges',
                options : '=visOptions'
            },
            link : function(scope, elem, attrs) {

                //-- VARIABLES --//
                var hasNetworkStabilized;

                function createDecisionNode(text) {
                    var data =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px">' +
                            '<rect style="border:1px solid;" x="15" y="10" width="100px" height="100px" stroke-width="10" fill="red" transform="translate(20 10) rotate(45 50 50)"/>' +
                            '<foreignObject x="20" y="20" width="100" height="100">' +
                                '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 10px; margin-left:auto; margin-right:auto; width:50px; border:1px solid;">' +
                                    text +
                                '</div>' +
                            '</foreignObject>' +
                        '</svg>';

                    var DOMURL = window.URL || window.webkitURL || window;
                    var img = new Image();
                    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
                    var url = DOMURL.createObjectURL(svg);

                    return url;
                }

                function handleVisStablizedEvent(properties) {
                    if(!hasNetworkStabilized) {
                        console.log("Network stabilized after " + properties.iterations + " iterations");
                        hasNetworkStabilized = true;
                        scope.network.storePositions();
                    }
                };

                function handleVisDragStart(event) {
                    if(event.nodeIds.length) {
                        var node = scope.nodes.get(event.nodeIds[0]);
                        setNodesMovable([node], true);
                    }
                }

                function handleVisDragEnd(event) {
                    console.log('=== Drag End == ');
                    if(event.nodeIds.length) {

                    }
                }

                function setNodesMovable(nodes, isMovable) {
                    scope.network.storePositions();
                    var updates = [];
                    nodes.each(function(node) {
                        var update = {
                            id : node.id,
                            /*isMovable : isMovable,
                             allowedToMoveY : isMovable*/
                            fixed : { x : isMovable, y : isMovable}
                        };
                        updates.push(update);
                    });

                    scope.nodes.update(updates);
                }

                // create a network
                var options = {
                    width: '100%',
                    height: '600px',
                    autoResize : true,
                    groups : {
                        gates : {
                            shape : 'diamond'
                        }, prescriptive : {
                            shape : 'box',
                            color : '#CDFFC3'
                        }
                    },
                    edges:{
                        smooth : false,
                        arrows : 'to'
                    },
                    physics: {
                        "barnesHut": {
                            "springLength": 120,
                            "avoidOverlap": 1
                        },
                        stabilization: true
                    },
                    manipulation : {
                        initiallyActive : true,
                        addNode : function(data,callback) {
                            var modalInstance = $modal.open({
                                templateUrl: 'components/graphs/directedacyclic/node-modal.html',
                                controller: 'nodeModalCtrl',
                                size: 'lg',
                                resolve : {
                                    nodeInstance : function() { return data; }
                                }
                            });
                            modalInstance.result.then(function (node) {
                                node.physics = false;
                                node.fixed = { x: false, y : false};
                                callback(node); // needed to update the graph
                            });
                        }
                        /*,editNode : function(data, callback) {
                            // This flag indicates Edit Node was clicked
                            // TODO: This is just a work around since visjs calls this method 3 times
                            if(this.isOnEdit)
                                return;

                            this.isOnEdit = true;
                            var me = this;
                            function resetEditFlag() {
                                me.isOnEdit && (delete me.isOnEdit);
                            }

                            var modalInstance = $modal.open({
                                templateUrl: 'components/graphs/directedacyclic/node-modal.html',
                                controller: 'nodeModalCtrl',
                                size: 'lg',
                                resolve : {
                                    nodeInstance : function() { return data; }
                                }
                            });
                            modalInstance.result.then(function success(node) {
                                callback(node); // needed to update the graph
                                resetEditFlag();
                            }, function cancel() { resetEditFlag()});
                        }*/
                        , addEdge : function(data, callback) {
                            if(data.from == data.to)
                                return;

                            var modalInstance = $modal.open({
                                templateUrl: 'components/graphs/directedacyclic/edge-modal.html',
                                controller: 'edgeModalCtrl',
                                size: 'lg',
                                resolve : {
                                    instance : function() { return data; }
                                }
                            });
                            modalInstance.result.then(function success(edge) {
                                callback(edge); // needed to update the graph\
                            });
                        }
                    }
                }


                scope.network = new vis.Network(elem[0], { nodes: scope.nodes, edges: scope.edges }, options);
                scope.network.once('stabilized', function(e){
                    scope.network.storePositions();
                    setNodesMovable(scope.nodes.get(), false);
                    scope.network.fit();
                });
            }
        }
    })

    .config(function($stateProvider){
        $stateProvider.state('myapp.dag', {
            url : 'graphs/dag',
            templateUrl : 'components/graphs/directedacyclic/directedacyclic.html',
            controller : 'dagCtrl'
        });
    });
