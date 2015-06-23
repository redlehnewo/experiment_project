/**
 * Created by owen on 6/23/15.
 */
(function(){
    /**
     * This directive is copied from angular-bootstrap pager directive
     */
    angular.module('myapp.ui.custompager',[])
        .directive('customPager', function(){
            return {
                restrict : 'AE',
                scope : {
                    totalItems: '=',
                    previousText: '@',
                    nextText: '@'
                },
                require: ['customPager', '?ngModel'],
                controller: 'PaginationController',
                templateUrl : 'components/ui-libs/custompager.tmp.html',
                replace: true,
                link : function(scope, element, attrs, ctrls) {
                    var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                    if (!ngModelCtrl) {
                        return; // do nothing if no ng-model
                    }

                    scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
                    paginationCtrl.init(ngModelCtrl, pagerConfig);
                }
            }
        })
})();