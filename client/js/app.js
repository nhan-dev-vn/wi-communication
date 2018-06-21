var app = angular.module('wi-help-desk-chat', ['apiServiceModule', 'left-side', 'right-side']);
app.controller('appCtrl', function($scope, apiService) {
    $scope.isLogin = false;
    $scope.login = function(name) {
        console.log('login', name);
        apiService.login({username: name}, function(res) {
            if(res) {
                $scope.username = res.username;
                window.localStorage.setItem('token', res.token);
                $scope.isLogin = true;
                apiService.getListConversation(res.token, {username: res.username}, function(res) {
                    if(res) {
                        self.listConver = res;
                    }else{
                        self.listConver = [];
                    }
                });
            }
        });
    }
});