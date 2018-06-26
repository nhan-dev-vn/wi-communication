let leftSideComponent = 'leftSide';
let leftSideModule = 'left-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    this.$onInit = function() {
    }
    this.fileName = function(path) {
        if(path)
        return path.substring(59+self.curConver.name.length, path.length);
        return '';
    }
    socket.on('join-help-desk', function(data) {
        console.log('join-help-desk', data);
        apiService.getConversation(self.token, {name: data.name}, function(res) {
            if(res) {
                self.listConver.unshift(res.conver);
                socket.emit('join-room', {username: self.user.username, idConversation: data.id});
            }
        });
    });
}

let appLeft = angular.module(leftSideModule, []);
appLeft.component(leftSideComponent, {
    templateUrl: 'components/left-side/left-side.html',
    controller: Controller,
    controllerAs: leftSideComponent,
    bindings: {
        token: '<',
        user: '<',
        listConver: '<',
        curConver: '='
    }
});
