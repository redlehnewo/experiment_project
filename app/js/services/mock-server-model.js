/**
 * Created by owen on 5/20/15.
 */
(function(){
    angular.module('myapp.mockServerModel',[])
        .service('MockServerModel', function($log) {

            /*var nodes = [
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
                , {id:'c15', label : 'C15\n\nVoluntary Notice\nContent', group:'prescriptive'}];*/

            /*var nodes = [
                {id:'g1', label : 'G1  Is PI collected from Kids?', group:'gates'}
                , {id:'g2', label : 'G2  Determine how PI is used', group:'gates'}
                , {id:'c1', label : 'C1  Privacy Notice Content', group:'prescriptive'}
                , {id:'c2', label : 'C2  Reqs communicated to 3rd party', group:'prescriptive'}
                , {id:'c3', label : 'C3  Track Disclosures', group:'prescriptive'}
                , {id:'g3', label : 'G3  Do you provide direct notice to parents?', group:'gates'}
                , {id:'g4', label : 'G4  Is PI collected only for single communications?', group:'gates'}
                , {id:'g5', label : 'G5  Do multiple comms to kids occur?', group:'gates'}
                , {id:'g6', label : 'G6  Do safety comms occur?', group:'gates'}
                , {id:'g7', label : 'G7  Do you send notice of multiple comms?', group:'gates'}
                , {id:'c4', label : 'C4  Determine whether PI is used only for operations', group:'prescriptive'}
                , {id:'c5', label : 'C5  Safety Notice Content', group:'prescriptive'}
                , {id:'c6', label : 'C6  Multiple Comms Notice Content', group:'prescriptive'}
                , {id:'c7', label : 'C7  Collection Limitation', group:'prescriptive'}
                , {id:'c8', label : 'C8  Deletion Requirements', group:'prescriptive'}
                , {id:'c9', label : 'C9  Use Limitation', group:'prescriptive'}
                , {id:'c10', label : 'C10  DN Timing', group:'prescriptive'}
                , {id:'c11', label : 'C11  DN Clarity', group:'prescriptive'}
                , {id:'c12', label : 'C12  DN Content', group:'prescriptive'}
                , {id:'c13', label : 'C13  VPC Timing', group:'prescriptive'}
                , {id:'c14', label : 'C14  VPC Methodology', group:'prescriptive'}
                , {id:'g8', label : 'G8  Is website content directed at kids?', group:'gates'}
                , {id:'g9', label : 'G9  Is VN Provided?', group:'gates'}
                , {id:'c15', label : 'C15  Voluntary Notice Content', group:'prescriptive'}];*/

            var nodes = [{
                "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
                "questionBlockType": "control",
                "recommendation": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "28b77d23-2711-40b1-9a39-76ec0194c90e",
                "name": "varius ut blandit non interdum in ante vestibulum"
            }, {
                "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
                "questionBlockType": "control",
                "recommendation": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "dcdceef3-8b36-4bf6-a5fd-91e58acc701e",
                "name": "in faucibus orci luctus et ultrices"
            }, {
                "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                "questionBlockType": "gate",
                "recommendation": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "4272ab23-6117-497c-b543-2e171a9837ae",
                "name": "elementum eu interdum eu tincidunt in"
            }, {
                "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                "questionBlockType": "gate",
                "recommendation": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "4d68b67c-a22a-4a6c-affc-45cf469a7284",
                "name": "rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel"
            }, {
                "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
                "questionBlockType": "gate",
                "recommendation": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "a6ea515e-76db-4455-87b0-2fee81f80db7",
                "name": "consequat ut nulla sed accumsan felis ut"
            }, {
                "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
                "questionBlockType": "control",
                "recommendation": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "4ee0330b-86a5-4343-a55c-0e85ce9ddbdc",
                "name": "ut volutpat sapien arcu sed augue aliquam erat volutpat"
            }, {
                "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                "questionBlockType": "control",
                "recommendation": "Fusce consequat. Nulla nisl. Nunc nisl.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "77d144f4-3635-469f-9b6d-5ab0d8432e52",
                "name": "elit proin interdum mauris non ligula"
            }, {
                "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
                "questionBlockType": "control",
                "recommendation": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "b893946a-3993-4412-87dd-18179dbcea78",
                "name": "ante vestibulum ante ipsum primis in faucibus orci"
            }, {
                "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                "questionBlockType": "control",
                "recommendation": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "fa3b071c-f18f-4826-8f65-a12c3d7bcc19",
                "name": "ornare imperdiet sapien urna pretium nisl ut volutpat"
            }, {
                "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
                "questionBlockType": "gate",
                "recommendation": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "a2318c2d-250d-405d-a0ee-067233118015",
                "name": "urna pretium nisl ut volutpat sapien arcu sed"
            }, {
                "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                "questionBlockType": "control",
                "recommendation": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "a5485dc9-6a6e-413a-8ce5-6c78340faa4d",
                "name": "vivamus in felis eu sapien cursus vestibulum proin"
            }, {
                "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
                "questionBlockType": "gate",
                "recommendation": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "d75d0180-a6f1-40c2-ac06-f989473fd398",
                "name": "mauris viverra diam vitae quam suspendisse"
            }, {
                "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
                "questionBlockType": "gate",
                "recommendation": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "4ebdbde4-b23e-48c1-81de-e1525eabf9cd",
                "name": "porta volutpat quam pede lobortis ligula sit"
            }, {
                "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
                "questionBlockType": "control",
                "recommendation": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "3ae893ba-6bd2-4264-ab6a-86fa82881902",
                "name": "odio elementum eu interdum eu tincidunt in"
            }, {
                "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                "questionBlockType": "control",
                "recommendation": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "33feaf27-973d-4fc6-a142-e31e235f5966",
                "name": "quis odio consequat varius integer ac leo"
            }, {
                "description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
                "questionBlockType": "gate",
                "recommendation": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "b1466c90-b7ad-4a7a-a8f1-850057f7c279",
                "name": "pellentesque viverra pede ac diam"
            }, {
                "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                "questionBlockType": "control",
                "recommendation": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "d220c861-ae48-4f99-b7e8-9547b4c6058c",
                "name": "augue vel accumsan tellus nisi eu orci"
            }, {
                "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
                "questionBlockType": "control",
                "recommendation": "Fusce consequat. Nulla nisl. Nunc nisl.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "a0c9a13e-cf8f-4d8b-bf04-42e9c3f8bd1a",
                "name": "pretium iaculis diam erat fermentum justo nec condimentum neque sapien"
            }, {
                "description": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
                "questionBlockType": "control",
                "recommendation": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "9e119c67-7f4c-4060-8c25-456e7a05d0dc",
                "name": "aliquam erat volutpat in congue etiam"
            }, {
                "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                "questionBlockType": "control",
                "recommendation": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                "customerId": "519ffe1a-30cf-4597-9433-1989c81ea031",
                "id": "64f11a5b-d6c3-4e95-add8-45ad99d1e959",
                "name": "in hac habitasse platea dictumst morbi vestibulum"
            }];

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