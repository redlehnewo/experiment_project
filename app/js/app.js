/**
 * Created by owen on 5/6/15.
 */
'user strict';

angular.module('myapp',[
        'ui.bootstrap',
        'ui.router',
        'myapp.config',
        'myapp.restServices',
        'myapp.modalService',
        'myapp.dag',
        'myapp.nodeModal',
        'myapp.edgeModal',
        'myapp.mockServerModel',
        //'myapp.mockBackend',
        'myapp.gdaprototype',
        'myapp.questionblock-modal',
        'myapp.ui.custompager',
        'myapp.ui.alertService',
        'ngVis'
    ])
    .controller('mainCtrl', function($scope, $state) {
        $scope.view = 'gdaprototype'
        $scope.setView = function(view) {
            $scope.view = view;
        }
        $state.go('myapp.gdaprototype')

    })

    .config(function($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise("myapp");
        $stateProvider
            .state('myapp', {
                abstract: true,
                template: '<ui-view/>'
            });
    });
