/**
 * Created by owen on 6/23/15.
 */
(function(){
    angular.module('myapp.ui.alertService', [])
        .factory('AlertService', function($rootScope, $timeout) {
            $rootScope.alerts = [];
            var alertService = {
                add : add,
                closeAlert : closeAlert,
                closeAlertIdx : closeAlertIdx,
                clear : clear
            };

            return alertService;

            ///////////////////////////////////

            function add (type, msg) {
                var instance = $rootScope.alerts.push({
                    type: type, // type can be: success, warning, danger
                    msg: msg,
                    close: function() {
                        return closeAlert(instance);
                    }
                });

                //auto-close after 5 sec
                $timeout(function(){ return closeAlert(instance); }, 5000);

                return instance;
            }

            function closeAlert (alert) {
                return closeAlertIdx($rootScope.alerts.indexOf(alert));
            }

            function closeAlertIdx (index) {
                return $rootScope.alerts.splice(index, 1);
            }

            function clear(){
                $rootScope.alerts = [];
            }
        });
})();