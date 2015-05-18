/**
 * Created by owen on 5/7/15.
 */
angular.module('myapp.dag',['myapp.nodeModal'])
    .controller('dagCtrl', function($scope, $modal, modalService){
        function runOnce(){
            $scope.nodes = new vis.DataSet();
            $scope.edges = new vis.DataSet();

            //-- Data Manipulation Options
            $scope.options = {
                dataManipulation : {
                    enabled: true,
                    initiallyVisible: true
                },
                onAdd : function(data,callback) {
                    var modalInstance = $modal.open({
                        templateUrl: 'components/graphs/directedacyclic/node-modal.html',
                        controller: 'nodeModalCtrl',
                        size: 'lg',
                        resolve : {
                            nodeInstance : function() { return data; }
                        }
                    });
                    modalInstance.result.then(function (node) {
                        callback(node); // needed to update the graph
                    });
                },
                onEdit : function(data, callback) {
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
                },
                onConnect : function(data, callback) {
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
                        callback(edge); // needed to update the graph
                    });
                },
                onEditEdge : function(data, callback) {
                    var modalInstance = $modal.open({
                        templateUrl: 'components/graphs/directedacyclic/node-modal.html',
                        controller: 'nodeModalCtrl',
                        size: 'lg',
                        resolve : {
                            nodeInstance : function() { return data; }
                        }
                    });
                }
            };
            loadSample();
        }

        function loadSample() {
            // create an array with nodes
            var _nodes = [
                {id:'g1', label : 'G1\n\nIs PI collected\nfrom Kids?', group:'gates'}
                , {id:'g2', label : 'G2\n\nDetermine how\nPI is used', group:'gates'}
                , {id:'c1', label : 'C1\n\nPrivacy Notice Content', group:'prescriptive'}
                , {id:'c2', label : 'C2\n\nReqs communicated\nto 3rd party', group:'prescriptive'}
                , {id:'c3', label : 'C3\n\nTrack Disclosures', group:'prescriptive'}
                , {id:'g3', label : 'G3\n\nDo you provide\ndirect notice to\nparents?', group:'gates'}
                , {id:'g4', label : 'G4\n\nIs PI collected\nonly for single\ncommunications?', group:'gates'}
                , {id:'g5', label : 'G5\n\nDo multiple comms\nto kids occur?', group:'gates'}
                , {id:'g6', label : 'G6\n\nDo safety comms\noccur?', group:'gates'}
                , {id:'g7', label : 'G7\n\nDo you send notice\nof multiple comms?', group:'gates'}
                , {id:'c4', label : 'C4\n\nDetermine whether PI\nis used only for\noperations', group:'prescriptive'}
                , {id:'c5', label : 'C5\n\nSafety Notice\nContent', group:'prescriptive'}
                , {id:'c6', label : 'C6\n\nMultiple Comms\nNotice Content', group:'prescriptive'}
                , {id:'c7', label : 'C7\n\nCollection\nLimitation', group:'prescriptive'}
                , {id:'c8', label : 'C8\n\nDeletion\nRequirements', group:'prescriptive'}
                , {id:'c9', label : 'C9\n\nUse\nLimitation', group:'prescriptive'}
                , {id:'c10', label : 'C10\n\nDN Timing', group:'prescriptive'}
                , {id:'c11', label : 'C11\n\nDN Clarity', group:'prescriptive'}
                , {id:'c12', label : 'C12\n\nDN Content', group:'prescriptive'}
                , {id:'c13', label : 'C13\n\nVPC Timing', group:'prescriptive'}
                , {id:'c14', label : 'C14\n\nVPC Methodology', group:'prescriptive'}
                , {id:'g8', label : 'G8\n\nIs website content\ndirected at kids?', group:'gates'}
                , {id:'g9', label : 'G9\n\nIs VN\nProvided?', group:'gates'}
                , {id:'c15', label : 'C15\n\nVoluntary Notice\nContent', group:'prescriptive'}
            ];
            $scope.nodes.add(_nodes);

            // create an array with edges
            var _edges = [
                {from:'g1', to : 'g2', label : 'Yes', style : 'arrow'}
                , {from:'g2', to : 'c1', label : 'Yes', style : 'arrow'}
                , {from:'c1', to : 'c2', style : 'dash-line'}
                , {from:'c2', to : 'c3', style : 'dash-line'}
                , {from:'g2', to : 'g3', style : 'dash-line'}
                , {from:'g3', to : 'g4', label : 'No', style : 'arrow'}
                , {from:'g4', to : 'g5', style : 'dash-line'}
                , {from:'g5', to : 'g6', style : 'dash-line'}
                , {from:'g5', to : 'g7', label : 'Yes', style : 'arrow'}
                , {from:'g6', to : 'c4', style : 'dash-line'}
                , {from:'g6', to : 'c5', label : 'Yes', style : 'arrow'}
                , {from:'g7', to : 'c6', label : 'Yes', style : 'arrow'}
                , {from:'g4', to : 'c7', label : 'Yes', style : 'arrow'}
                , {from:'c7', to : 'c8', style : 'dash-line'}
                , {from:'c8', to : 'c9', style : 'dash-line'}
                , {from:'g3', to : 'c10', label : 'Yes', style : 'arrow'}
                , {from:'c10', to : 'c11', style : 'dash-line'}
                , {from:'c11', to : 'c12', style : 'dash-line'}
                , {from:'c12', to : 'c13', style : 'dash-line'}
                , {from:'c13', to : 'c14', style : 'dash-line'}
                , {from:'g1', to : 'g8', label : 'No', style : 'arrow'}
                , {from:'g8', to : 'g9', label : 'Yes', style : 'arrow'}
                , {from:'g9', to : 'c15', label : 'Yes', style : 'arrow'}
            ];
            $scope.edges.add(_edges);
        }

        runOnce();
    })

    .constant('VisDefaultOptions', {
        width: '100%',
        height: '500px',
        stabilize : true,
        smoothCurves : false,
       /* configurePhysics: true,*/
        physics: {
            hierarchicalRepulsion : { nodeDistance: 200 }
        },
        hierarchicalLayout: {
            direction: 'LR'
            , levelSeparation: 250
            , nodeSpacing: 250
        },
        edges : {
            dash : {
                length : 15, gap : 10, altLength : 15
            }
            /*,style : 'arrow'*/
        }
        , groups : {
            gates : {
                shape : 'ellipse'
            }, prescriptive : {
                shape : 'box',
                radius : 10,
                color : '#CDFFC3'
            }
        }
    })

    .directive('angularVis', function (VisDefaultOptions) {
        return {
            restrict : 'EA',
            replace : true,
            scope : {
                nodes : '=visNodes',
                edges : '=visEdges',
                options : '=visOptions'
            },
            link : function(scope, elem, attrs) {

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

                var options = angular.extend({}, VisDefaultOptions);
                if(scope.options) {
                    options = angular.extend(options, scope.options)
                }
                // create a network
                scope.network = new vis.Network(elem[0], { nodes: scope.nodes, edges: scope.edges }, options);
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
