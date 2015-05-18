/**
 * Created by owen on 5/6/15.
 */
'user strict';

angular.module('myapp',[
        'ui.bootstrap',
        'ui.router',
        'myapp.config',
        'myapp.modalService',
        'myapp.dag',
        'myapp.nodeModal',
        'myapp.edgeModal'
    ])
    .controller('mainCtrl', function($scope, $state) {
        $scope.view = 'graphs'
        $scope.setView = function(view) {
            $scope.view = view;
        }
        $state.go('myapp.dag')

    })

    .config(function($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise("myapp");
        $stateProvider
            .state('myapp', {
                abstract: true,
                template: '<ui-view/>'
            });
    });
