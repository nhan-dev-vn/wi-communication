(function () {
    let component = 'login';
    let module = 'login';

    function Controller() {

    }

    let login = angular.module(module, []);
    login.component(component, {
        templateUrl: 'pages/login/login.html',
        controller: Controller,
        controllerAs: 'self',
        bindings: {
            loginFun: '<'
        }
    });

})()