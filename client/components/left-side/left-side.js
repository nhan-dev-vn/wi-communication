let leftSideComponent = 'leftSide';
let leftSideModule = 'left-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    this.$onInit = function() {
    }
    this.fileName = function(path) {
        if(path)
        return path.substring(61+self.curConver.name.length, path.length);
        return '';
    }
    this.seenConv = function(conver) {
        self.curConver = conver
        appService.getPendingConversation({
            idUser: self.user.id,
            idConversation: self.curConver.id
        })
        console.log({user:self.user.id});
        console.log({listConver:self.listConver});
        console.log({curConver:self.curConver.id})
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
