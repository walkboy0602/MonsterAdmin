
//declare a module
var shopApp = angular.module("shopApp", ['shopAPI', 'ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngResource'])
                    .config(function ($locationProvider, $routeProvider) {

                    });

shopApp.run(['$rootScope', '$window', '$http', '$location', '$route', '$routeParams',
    function ($rootScope, $window, $http, $location, $route, $routeParams) {
        //add this so server side will recognise as ajax request
        $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


        $rootScope.id = $location.search().id;

        $rootScope.Enum = {
            ReferenceType: {
                None: 0,
                SaleType: 1,
                Category: 2,
                Tag: 3
            }
        }

        //set global data
        if (undefined !== $window.data) {
            $rootScope.id = $window.data.id;
        }

        $rootScope.errorMessage = "Sorry, there was an error while processing your request. <br/> Please contact our support";

        $rootScope.success = function (msg) {
            $rootScope.alert = {
                type: 'success',
                display: true,
                message: msg
            };
        }

        $rootScope.warning = function (message) {
            $rootScope.alert = {
                type: 'warning',
                display: true,
                message: message
            };
        }

        $rootScope.error = function (message) {
            $rootScope.alert = {
                type: 'danger',
                display: true,
                message: angular.isUndefined !== message ? $rootScope.errorMessage : message
            };
        }

    }]);
