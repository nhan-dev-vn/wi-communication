let rightSideComponent = 'rightSide';
let rightSideModule = 'right-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    let textMessage = $('#text-message');
    let listMessage = $('.list-message');
    this.$onInit = function() {
        $timeout(function(){
            listMessage.scrollTop(listMessage[0].scrollHeight);
        }, 500);
    }
    function send(e) {
        let content = textMessage.val().split('\n').join('<br/>');
        let message = {
            content: content,
            type: 'text',
            idSender: self.user.id,
            idConversation: self.curConver.id,
            User: self.user,
            createdAt: new Date()
        };
        apiService.postMessage(message, self.token, function (res) {
        });
        e && e.preventDefault();
        textMessage.val('');
    }
    textMessage.keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            send(e);
        }
    });
    this.sendMessage = function() {
        send();
    }
    this.fileName = function(path) {
        return path.substring(59+self.curConver.name.length, path.length);
    }
    this.upload = function (files) {
        async.forEachOfSeries(files, (file, i, _done) => {
            let type = file.type.substring(0, 5);
            apiService.upload({
                file: file,
                fields: {'name': self.curConver.name}
            }, self.token, (res) => {
                if(res) {
                    let message = {
                        content: res,
                        type: type=='image'?'image':'file',
                        idSender: self.user.id,
                        idConversation: self.curConver.id,
                        User: self.user,
                        createdAt: new Date()
                    }
                    apiService.postMessage(message, self.token, (res) => {
                            _done();
                    });
                }
            })
        }, (err) => {

        });
    }
    this.download = function(path) {
        let p = path.slice(25);
        return 'http://13.251.24.65:5005/api/download/'+p+'?token='+self.token;
    }
    socket.on('sendMessage', function(data) {
        $timeout(function() {
            self.listConver.filter(function(conver) { return conver.id==data.idConversation; })[0].Messages.push(data);
            $timeout(function(){
                listMessage.scrollTop(listMessage[0].scrollHeight);
            }, 500);
        })
    });
}

let appRight = angular.module(rightSideModule, []);
appRight.component(rightSideComponent, {
    templateUrl: 'components/right-side/right-side.html',
    controller: Controller,
    controllerAs: rightSideComponent,
    bindings: {
        token: '<',
        user: '<',
        listConver: '<',
        curConver: '='
    }
});
