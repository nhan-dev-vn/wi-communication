let loginComponent = 'login';
let loginModule = 'login';

function Controller(apiService, $timeout){
    let self = this;
    this.doLogin = function() {
        if(!self.username) {
            toastr.error('Username is required');
            return;
        }
        if(!self.password) {
            toastr.error('Password is required');
            return;
        }
        toastr.success(self.username, self.password);
    }
}

let appLogin = angular.module(loginModule, []);
appLogin.component(loginComponent, {
    templateUrl: 'components/login/login.html',
    controller: Controller,
    controllerAs: loginComponent,
    bindings: {
        token: '=',
        user: '=',
        listConver: '=',
        curConver: '=',
        numNewMess: '=',
        isLogin: '='
    }
});
