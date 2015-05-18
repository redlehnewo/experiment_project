'use strict';

angular.module('myapp.modalService', ['ui.bootstrap'])

/**
 * Register modal in angular.config().
 *
 * modalServiceProvider.modal('modalName', { // modal options
 *      templateUrl: 'some/path/sample-modal.html',
 *      controller: 'modalCtrl',
 *      // etc..
 * });
 *
 *
 * Two ways in activating a modal.
 *
 * 1. Call modalService.open('modalName') in the controller w/ch will also return the modalInstance.
 * 2. Use `open-modal` directive in a link or button.
 */
    .provider('modalService', function() {
        var modalMap = {};

        this.modal = function(name, options) {
            modalMap[name] = options;
        };

        this.$get = function($modal) {
            return {
                open: function(name, params) {
                    var options = angular.extend({}, modalMap[name]);
                    options.resolve = options.resolve || {};
                    angular.extend(options.resolve, {
                        modalParams: function() { return params || {}; }
                    });
                    return $modal.open(options);
                }
            }
        };
    })

/**
 * Sample Usage:
 *
 * <a open-modal="modalName({data: 'resolvedData'})" on-close="onCloseCallback(result)" on-dismiss="onDismissCallback(reason)"></a>
 *
 * Resolved data are available in modalParams.
 */
    .directive('openModal', function(modalService, $parse) {
        return {
            link: function(scope, element, attrs) {

                function parseModalRef(ref, current) {
                    var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
                    if (preparsed) ref = current + '(' + preparsed[1] + ')';
                    parsed = ref.replace(/\n/g, ' ').match(/^([^(]+?)\s*(\((.*)\))?$/);
                    if (!parsed || parsed.length !== 4) throw new Error('Invalid modal ref "' + ref + '"');
                    return { modal: parsed[1], paramExpr: parsed[3] || null };
                }

                var ref = parseModalRef(attrs.openModal),
                    params = null,
                    onClose = attrs.onClose ? $parse(attrs.onClose) : angular.noop,
                    onDismiss = attrs.onDismiss ? $parse(attrs.onDismiss) : angular.noop;

                if (ref.paramExpr) {
                    params = angular.copy(scope.$eval(ref.paramExpr));
                }

                if (element.prop('tagName').toUpperCase() === 'A') {
                    attrs.$set('href', '');
                    attrs.$set('target', '');
                }

                element.bind('click', function(e) {
                    e.preventDefault();
                    var modalInstance = modalService.open(ref.modal, params);
                    modalInstance.result.then(
                        function(result) {
                            onClose(scope, {result: result});
                        },
                        function(reason) {
                            onDismiss(scope, {reason: reason});
                        }
                    );
                });
            }
        }
    });