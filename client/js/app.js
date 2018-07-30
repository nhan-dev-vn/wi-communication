var app = angular.module('wi-help-desk-chat', ['ngFileUpload', 'apiServiceModule', 'left-side', 'right-side', 'login', 'ngSanitize','chat-message', 'img-preview', 'uiModule']);
app.controller('appCtrl', function($scope, apiService, $timeout, ui) {
    let listMessage = $('.list-message');
    // $scope.login = function(name, password) {
    //     console.log('login', name);
    //     apiService.login({
    //         username: name,
    //         password: password
    //     }, function(res) {
    //         if(res) {
    //             $scope.user = res.user;
    //             $scope.token = res.token;
    //             window.localStorage.setItem('token', res.token);
    //             $scope.isLogin = true;
    //             apiService.getListConversation(res.token, {username: res.user.username}, function(res) {
    //                 if(res) {
    //                     $scope.listConver = res.list;
    //                     $scope.numNewMess = res.numNewMess;
    //                     if($scope.listConver && $scope.listConver.length) {
    //                         $scope.listConver.forEach(function(conver) {
    //                             socket.emit('join-room', {username: $scope.user.username, idConversation: conver.id});
    //                         });
    //                         $scope.curConver = $scope.listConver[0];
    //                     } else {
    //                         $scope.curConver = {};
    //                     }
    //
    //                 }else{
    //                     $scope.listConver = [];
    //                     $scope.curConver = {};
    //                     $scope.numNewMess = 0;
    //                 }
    //             });
    //         }
    //     });
    // }
    $scope.$watch('curConver', function(newVal, oldVal, scope) {
        ui.showConversation()
        //console.log('watch')
    })

});
