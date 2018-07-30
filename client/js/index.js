angular
    .module('wi-help-desk-chat', ['ngRoute', 'ngFileUpload', 'apiServiceModule', 'left-side', 'right-side', 'ngSanitize','chat-message', 'img-preview', 'uiModule'])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'pages/login/login.html',
                controller: 'login',
                controllerAs: 'login'
            })
            .when('/', {
                templateUrl: 'pages/home/home.html',
                controller: 'home',
                controllerAs: 'home'
            })
            .otherwise({ redirectTo: '/login' });
    }])
    .controller ('appCtrl', function ($location) {
        $location.path('/login');
    })
