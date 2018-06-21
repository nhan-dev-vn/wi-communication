var app = angular.module('wi-help-desk-chat', ['apiServiceModule', 'left-side', 'right-side']);
app.controller('appCtrl', function($scope, apiService, $timeout) {
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
                        $scope.listConver = res;
                        $scope.listConver.forEach(function(conver) {
                            socket.emit('join-room', {username: $scope.username, idConversation: conver.id});
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
    socket.on('sendMessage', function(data) {
        $timeout(function() {
            $scope.listConver.filter(function(conver) { return conver.id==data.idConversation; })[0].Messages.push(data);
        })
    });
});