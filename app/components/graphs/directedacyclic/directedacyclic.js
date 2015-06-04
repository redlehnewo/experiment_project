/**
 * Created by owen on 5/7/15.
 */
angular.module('myapp.dag',['myapp.nodeModal'])
    .controller('dagCtrl', function($scope, $modal, modalService, MockServerModel, SurveyGraph, VisDefaultOptions, VisBarnesHutOptions){

        function runOnce(){
            $scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();

            $scope.nodes.on('add', function callback(event, properties, senderId){
                //console.log(properties);
                properties.items && properties.items.length && properties.items.each(function(n){
                    var node = $scope.nodes.get(n);
                    if(node){
                        node.fixed = true;
                        node.physics = false;
                    }
                    console.log(node);
                })
            });

            SurveyGraph.get(function success(graph){
                if(graph) {
                    graph.nodes && $scope.nodes.add(graph.nodes);
                    graph.edges && $scope.edges.add(graph.edges);
                }
            });
        }

        runOnce();

        //-- Data Manipulation Options
        /*$scope.options = {
            physics: {
                hierarchicalRepulsion : { nodeDistance: 200 }
            },
            hierarchicalLayout: {
                direction: 'LR'
                , levelSeparation: 250
                , nodeSpacing: 250
                , layout : 'direction'
            }
        };*/

        var defaultOptions  = angular.copy(VisDefaultOptions);
        //defaultOptions.physics && (delete defaultOptions.physics);
        //defaultOptions.hierarchicalLayout && (delete defaultOptions.hierarchicalLayout);
        //$scope.visBarnesHutOptions = angular.extend(defaultOptions, VisBarnesHutOptions);

        //$scope.visBarnesHutOptions = angular.extend({},VisDefaultOptions);
    })

    /*.constant('VisDefaultOptions', {
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
        },
        interaction:{
            dragNodes:true,
            dragView: true,
            hideEdgesOnDrag: false,
            hideNodesOnDrag: false,
            hover: false,
            keyboard: {
                enabled: false,
                speed: {x: 10, y: 10, zoom: 0.02},
                bindToWindow: true
            },
            navigationButtons: false,
            selectable: true,
            selectConnectedEdges: true,
            tooltipDelay: 300,
            zoomView: true
        },
        edges:{
            smooth : false
        },
        layout: {
            "hierarchical": {
                "enabled": true,
                "direction": "LR",
                "sortMethod": "directed"
            }
        },
        physics: {
            "hierarchicalRepulsion": {
                "centralGravity": 0
            },
            "solver": "hierarchicalRepulsion"
        }
    })*/

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
                    console.log(nodes);
                    nodes.each(function(node) {
                        var update = {
                            id : node.id,
                            allowedToMoveX : isMovable,
                            allowedToMoveY : isMovable
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
                        },
                        editNode : function(data, callback) {
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
                        }
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
                    scope.network.fit();
                    console.log("Stabilized!!!" + e.iterations);
                });
            }
        }
    })

    .factory('DiamondImg', function (text) {
        var data =
            '<svg xmlns="http://www.w3.org/2000/svg" width="243" height="65">' +
                '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
                '<foreignObject x="15" y="10" width="100%" height="100%">' +
                    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px" class="diamond">' +
                        '<span>' + text + '</span>' +
                    '</div>' +
                '</foreignObject>' +
            '</svg>';


        var DOMURL = window.URL || window.webkitURL || window;
        var img = new Image();
        var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);

        return url;
    })

    .directive('angularCytoscape', function($timeout){
        return {
            scope : {
            },
            link : function(scope, elem, attrs) {

                scope.layout = {
                    name: 'breadthfirst',
                    directed : false,
                    padding: 10
                }

                scope.style = cytoscape.stylesheet()
                    .selector('node')
                    .css({
                        'shape': 'data(faveShape)',
                        'width': '100px',
                        'font-size' : '5px',
                        'font-weight' : 'bold',
                        'text-wrap' : 'wrap',
                        'text-max-width': '80px',
                        'content': 'data(name)',
                        'text-valign': 'center',
                        'text-outline-width': 2,
                        'text-outline-color': 'data(faveColor)',
                        'background-color': 'data(faveColor)',
                        'color': '#fff'
                    })
                    .selector(':selected')
                    .css({
                        'border-width': 3,
                        'border-color': '#333'
                    })
                    .selector('edge')
                    .css({
                        'opacity': 0.666,
                        'width': 'mapData(strength, 70, 100, 2, 6)',
                        'target-arrow-shape': 'triangle',
                        'line-color': 'data(faveColor)',
                        'source-arrow-color': 'data(faveColor)',
                        'target-arrow-color': 'data(faveColor)'
                    })
                    .selector('edge.questionable')
                    .css({
                        'line-style': 'dotted',
                        'target-arrow-shape': 'diamond'
                    })
                    .selector('.faded')
                    .css({
                        'opacity': 0.25,
                        'text-opacity': 0
                    });

                var _nodes = [
                    { data: { id: 'j', name: 'The quick brown fox jumps over the lazy dog by the river bank.', weight: 65, faveColor: '#6FB1FC', faveShape: 'diamond' } },
                    { data: { id: 'e', name: 'Elaine', weight: 45, faveColor: '#EDA1ED', faveShape: 'ellipse' } },
                    { data: { id: 'k', name: 'The quick brown fox jumps over the lazy dog.', weight: 100, faveColor: '#86B342', faveShape: 'rectangle' } },
                    { data: { id: 'g', name: 'George', weight: 70, faveColor: '#F5A45D', faveShape: 'rectangle' } }
                ];

                var _edges = [
                    { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 90 } },
                    { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 70 } },
                    { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 80 } },

                    { data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 95 } },
                    { data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 60 }, classes: 'questionable' },

                    { data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 100 } },
                    { data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 100 } },
                    { data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 100 } },

                    { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 90 } }
                ];

                function redraw() {

                }

                function destroy() {

                }

                scope.$watch('data', function(newVal) {
                    if(scope.data) {

                    }
                });

                $(elem[0]).cytoscape({
                    layout: scope.layout,
                    style : scope.style,
                    elements : {
                        nodes : _nodes,
                        edges : _edges
                    },
                    ready : function() {
                        scope.cy = this;
                        scope.cy.fit();
                    }
                });

                /*$timeout(function() {
                    _nodes.each(function(node) {
                        node.group = 'nodes';
                        scope.cy.add(node);
                    });

                    _edges.each(function(edge) {
                        edge.group = 'edges';
                        scope.cy.add(edge);
                    });

                    scope.cy.fit();
                    scope.cy.forceRender();
                },1000);*/
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
