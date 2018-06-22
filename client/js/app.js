var app = angular.module('wi-help-desk-chat', ['ngFileUpload', 'apiServiceModule', 'left-side', 'right-side', 'ngSanitize']);
app.controller('appCtrl', function($scope, apiService, $timeout) {
    let listMessage = $('.list-message');
    $scope.isLogin = false;
    $scope.login = function(name) {
        console.log('login', name);
        apiService.login({username: name}, function(res) {
            if(res) {
                $scope.user = res.user;
                $scope.token = res.token;
                window.localStorage.setItem('token', res.token);
                $scope.isLogin = true;
                apiService.getListConversation(res.token, {username: res.user.username}, function(res) {
                    if(res) {
                        $scope.listConver = res;
                        $scope.listConver.forEach(function(conver) {
                            socket.emit('join-room', {username: $scope.user.username, idConversation: conver.id});
                        });
                        $scope.curConver = $scope.listConver[0];
                    }else{
                        $scope.listConver = [];
                        $scope.curConver = {};
                    }
                });
            }
        });
    }
    
});