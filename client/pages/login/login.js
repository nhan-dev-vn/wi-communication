angular
    .module('wi-help-desk-chat')
    .controller('login', login);

function login(apiService, $location) {
    let self = this;
    this.doLogin = function () {
        if (!self.username) {
            toastr.error('Username is required');
            return;
        }
        if (!self.password) {
            toastr.error('Password is required');
            return;
        }
        apiService.login({
            username: self.username,
            password: self.password
        }, function (res) {
            if(res && (res.user.role == 0 || res.user.role == 1)) {
                window.localStorage.setItem('user', JSON.stringify(res.user));
                window.localStorage.setItem('token', res.token);
                $location.path('/');
                console.log(res);
            }
            else {
                toastr.error('login fail')
            }
        })
        
    }
}



// let loginComponent = 'login';
// let loginModule = 'login';

// function Controller(apiService, $timeout){
//     let self = this;
//     this.doLogin = function() {
//         if(!self.username) {
//             toastr.error('Username is required');
//             return;
//         }
//         if(!self.password) {
//             toastr.error('Password is required');
//             return;
//         }
//         toastr.success(self.username, self.password);
//     }
// }

// let appLogin = angular.module(loginModule, []);
// appLogin.component(loginComponent, {
//     templateUrl: 'components/login/login.html',
//     controller: Controller,
//     controllerAs: loginComponent,
//     bindings: {
//         token: '=',
//         user: '=',
//         listConver: '=',
//         curConver: '=',
//         numNewMess: '=',
//         isLogin: '='
//     }
// });
