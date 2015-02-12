'use strict';

angular
    .module('themesApp', [

        'http-auth-interceptor',

        'toggle-switch',
        'ui.bootstrap',
        'ui.select2',
        'ngGrid',
        'xeditable',


        'otd.controller.navigation',
        'otd.controller.userstable',
        'otd.controller.login',
        'otd.controller.headerUserBar',
        'otd.controller.userstatistics',
        'otd.controller.register',
        'otd.controller.dungeon',

        'otd.services.auth',
        'otd.services.base64',
        'otd.services.user',
        'otd.services.activeUser',
        'otd.services.pinesNotifications',
        'otd.services.blueprints',
        'otd.services.dungeon',
        'otd.services.dungeonblueprints',

        'otd.templates.TemplatesCache',
        'otd.templates.TemplatesCacheOverride',

        'otd.util.httpErrorInterceptor',
        'otd.util.constants',

        'otd.shared.Directives',

        'ngDragDrop',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate'
    ])
    .controller('MainController', ['$scope', '$log', 'AuthenticationService', 'authService', 'ActiveUserService', function ($scope, $log, AuthenticationService, authService, ActiveUserService) {
        $scope.style_fixedHeader = true;
        $scope.style_headerBarHidden = false;
        $scope.style_layoutBoxed = false;
        $scope.style_fullscreen = false;
        $scope.style_leftbarCollapsed = false;
        $scope.style_leftbarShown = true;
        $scope.style_rightbarCollapsed = true;
        $scope.style_isSmallScreen = false;
        $scope.style_showSearchCollapsed = true;
        $scope.style_layoutHorizontal = false;

        /* http-auth-interceptor Event handling
        *  and modifying Authorization Headers in
        *  buffered $http Requests that failed due to a 401 before
        */
        $scope.$on('event:auth-loginRequired', function (event, newVal) {
            AuthenticationService.refresh(
                function(newAccessToken){
                    authService.loginConfirmed(
                        'success',
                        function(config){
                            config.headers["Authorization"] = 'Bearer '+newAccessToken;
                            return config;
                        }
                    )
                },
                function(){
                    $location.path("/login");
                }
            );
        });

        /*
         * Maintaining login status globally through MainController
         */
        $scope.isLoggedIn = AuthenticationService.isLoggedIn();
        $scope.$on('Auth:loggedOut', function (event, newVal) {
            $scope.isLoggedIn = AuthenticationService.isLoggedIn();
            $scope.activeUser = {};
            ActiveUserService.clear();
        });
        $scope.$on('Auth:loggedIn', function (event, newVal) {
            $scope.isLoggedIn = AuthenticationService.isLoggedIn();

            ActiveUserService.getActiveUser().then(
                function (activeUser) {
                    $scope.activeUser = activeUser;
                },
                function (errorPayload) {
                    $log.info("Could not get the active User. Responsecode=" + status);
                }
            );
        });

    }])

    .config(['$provide', '$routeProvider', function ($provide, $routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'views/home.html' })
            .when('/dashboard/', { templateUrl: 'views/dashboard.html' })
            .when('/user/login/', { templateUrl: 'views/user/login.html' })
            .when('/user/edit/', { templateUrl: 'views/user/edit.html' })
            .when('/user/register/', { templateUrl: 'views/user/register.html' })
            .when('/dungeon/', { templateUrl: 'views/dungeonEditor.html' })

            .otherwise({
                redirectTo: '/'
            });
    }]);
