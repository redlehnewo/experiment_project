/**
 * Created by owen on 5/20/15.
 */
(function(){
    angular.module('myapp.mockServerModel',[])
        .service('MockServerModel', function($log) {

            var nodes = [
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
                , {id:'c15', label : 'C15\n\nVoluntary Notice\nContent', group:'prescriptive'}];

            var edges = [
                {from:'g1', to : 'g2', label : 'Yes'}
                , {from:'g2', to : 'c1', label : 'Yes'}
                , {from:'c1', to : 'c2', dashes : true}
                , {from:'c2', to : 'c3', dashes : true}
                , {from:'g2', to : 'g3', dashes : true}
                , {from:'g3', to : 'g4', label : 'No' }
                , {from:'g4', to : 'g5', dashes : true}
                , {from:'g5', to : 'g6', dashes : true}
                , {from:'g5', to : 'g7', label : 'Yes' }
                , {from:'g6', to : 'c4', dashes : true}
                , {from:'g6', to : 'c5', label : 'Yes' }
                , {from:'g7', to : 'c6', label : 'Yes' }
                , {from:'g4', to : 'c7', label : 'Yes' }
                , {from:'c7', to : 'c8', dashes : true}
                , {from:'c8', to : 'c9', dashes : true}
                , {from:'g3', to : 'c10', label : 'Yes' }
                , {from:'c10', to : 'c11', dashes : true}
                , {from:'c11', to : 'c12', dashes : true}
                , {from:'c12', to : 'c13', dashes : true}
                , {from:'c13', to : 'c14', dashes : true}
                , {from:'g1', to : 'g8', label : 'No' }
                , {from:'g8', to : 'g9', label : 'Yes' }
                , {from:'g9', to : 'c15', label : 'Yes' }];

            var service = {
                edges : edges,
                nodes : nodes,
                addEdge : addEdge,
                addNode : addNode,
                getGraph : getGraph,
                getNodes : getNodes
            }

            return service;

            ///////////////////////////////////////////

            function addNode(node) {
                nodes.add(service.node);
            }

            function addEdge(edge) {
                edges.add(service.edge);
            }

            function getGraph() {
                return { nodes : service.nodes, edges : service.edges };
            }

            function getNodes() {
                return service.nodes;
            }
        });
})();