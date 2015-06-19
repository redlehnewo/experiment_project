/**
 * Created by owen on 6/5/15.
 */

angular.module('ngVis',[])
    /**
     *  For reference about DataSet see :
     *      http://visjs.org/docs/data/dataset.html
     */
    .factory('VisDataSet', function(){
        return function(data, options) {
            return new vis.DataSet(data, options);
        }
    })

    .constant('VisDefaultOptions', {
        width: '100%',
        height: '600px',
        autoResize: true,
        groups: {
            gates: {
                shape: 'diamond'
            }, prescriptive: {
                shape: 'box',
                color: '#CDFFC3'
            }
        },
        edges: {
            smooth: false,
            arrows: 'to'
        },
        physics: {
            "barnesHut": {
                "springLength": 120,
                "avoidOverlap": 1
            },
            solver : 'barnesHut',
            stabilization: true
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

    .directive('angularVisNetwork', function (VisDefaultOptions, $modal, $log) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                nodes: '=visNodes',
                edges: '=visEdges',
                options: '=visOptions'
            },
            link: function (scope, elem, attrs) {

                //-- VARIABLES --//
                var hasNetworkStabilized;

                function handleVisStablizedEvent(properties) {
                    if (!hasNetworkStabilized) {
                        console.log("Network stabilized after " + properties.iterations + " iterations");
                        hasNetworkStabilized = true;
                        scope.network.storePositions();
                    }
                };

                function handleVisDragStart(event) {
                    if (event.nodeIds.length) {
                        var node = scope.nodes.get(event.nodeIds[0]);
                        setNodesMovable([node], true);
                    }
                }

                function handleVisDragEnd(event) {
                    console.log('=== Drag End == ');
                    if (event.nodeIds.length) {

                    }
                }

                function setNodesMovable(nodes, isMovable) {
                    scope.network.storePositions();
                    var updates = [];
                    nodes.each(function (node) {
                        var update = {
                            id: node.id,
                            /*isMovable : isMovable,
                             allowedToMoveY : isMovable*/
                            fixed: { x: isMovable, y: isMovable}
                        };
                        updates.push(update);
                    });

                    scope.nodes.update(updates);
                }

                // create a network
                /*var options = {
                    width: '100%',
                    height: '600px',
                    autoResize: true,
                    groups: {
                        gates: {
                            shape: 'diamond'
                        }, prescriptive: {
                            shape: 'box',
                            color: '#CDFFC3'
                        }
                    },
                    edges: {
                        smooth: false,
                        arrows: 'to'
                    },
                    physics: {
                        "barnesHut": {
                            "springLength": 120,
                            "avoidOverlap": 1
                        },
                        solver : 'barnesHut',
                        stabilization: true
                    }
                    , manipulation: {
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
                        }, addEdge: function (data, callback) {
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
                }*/

                var options = angular.extend({}, VisDefaultOptions, scope.options);
                scope.network = new vis.Network(elem[0], { nodes: scope.nodes, edges: scope.edges }, options);
            }
        }
    });
