(function () {
    let component = 'dashboard';
    let module = 'dashboard';

    function Controller() {

    }

    let dashboard = angular.module(module, []);
    dashboard.component(component, {
        templateUrl: 'pages/dashboard/dashboard.html',
        controller: Controller,
        controllerAs: component,
        bindings: {

        }
    });

})()