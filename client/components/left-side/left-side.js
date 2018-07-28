let leftSideComponent = 'leftSide';
let leftSideModule = 'left-side';

function Controller(apiService, $timeout, ui){
    let self = this;
    this.$onInit = function() {
    }
    this.fileName = function(path) {
        if(path)
        return path.substring(61+self.curConver.name.length, path.length);
        return '';
    }
    this.lastMessFontWeight = function(conver) {
        return conver.lastMessFontWeight? conver.lastMessFontWeight:"100";
    }
    this.changeCurConver = function(conver) {
        self.curConver = conver;
        ui.showConversation(conver)
        if(self.curConver.lastMessFontWeight=='bolder') {
            apiService.seenMessage({
                idUser: self.user.id,
                nameConversation: self.curConver.name
            }, self.token, function() {});
            self.curConver.lastMessFontWeight='100';
            self.numNewMess--;
        }
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
    socket.on('sendMessage', function(data) {
        $timeout(function() {
            let con = self.listConver.filter(function(conver) { return conver.id==data.idConversation; })[0];
            if(con.id==self.curConver.id && $('#text-message').is(':focus')) {

            }
            else if(!con.lastMessFontWeight || con.lastMessFontWeight=="100") {
                con.lastMessFontWeight = "bolder";
                self.numNewMess ++;
            }
        })
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
        listConver: '=',
        curConver: '=',
        numNewMess: '='
    }
});
