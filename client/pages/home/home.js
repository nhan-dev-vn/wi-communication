angular
    .module('wi-help-desk-chat')
    .controller('home', home);

function home($scope, apiService, $timeout, ui) {
    let listMessage = $('.list-message');

    $scope.user = JSON.parse(window.localStorage.getItem('user'));
    $scope.token = window.localStorage.getItem('token');

    apiService.getListConversation($scope.token, { username: $scope.user.username }, function (res) {
        if (res) {
            $scope.listConver = res.list;
            $scope.numNewMess = res.numNewMess;
            if ($scope.listConver && $scope.listConver.length) {
                $scope.listConver.forEach(function (conver) {
                    socket.emit('join-room', { username: $scope.user.username, idConversation: conver.id });
                });
                $scope.curConver = $scope.listConver[0];
            } else {
                $scope.curConver = {};
            }

        } else {
            $scope.listConver = [];
            $scope.curConver = {};
            $scope.numNewMess = 0;
        }
    });
    $scope.$watch('curConver', function (newVal, oldVal, scope) {
        ui.showConversation()
        //console.log('watch')
    })
}