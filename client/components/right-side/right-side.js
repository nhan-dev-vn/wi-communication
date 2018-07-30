let rightSideComponent = 'rightSide';
let rightSideModule = 'right-side';

function Controller(apiService, $timeout, ui){
    const WIDTH_IMAGE_THUMB = 130;
    let self = this;
    let lengthUrl = apiService.URL.length;
    let textMessage = $('#text-message');
    let listMessage = $('.list-message');
    this.$onInit = function() {
        // $timeout(function(){
        //     listMessage.scrollTop(listMessage[0].scrollHeight);
        // }, 500);

        ui.onShowConversation(conver => {
            $timeout(function () {
                const convFrame = document.querySelector('.list-message')
                //console.log({ convFrame })
                //console.log(convFrame.scrollHeight)
                convFrame.scrollTo(0, convFrame.scrollHeight * 100)
            }, 500);

        })
    }
    function send(e) {
        // let content = textMessage.val().split('\n').join('<br/>');
        let content = textMessage.val();
        if(content) {
            let message = {
                content: preventXSS(content),
                type: 'text',
                idSender: self.user.id,
                idConversation: self.curConver.id,
                User: self.user,
                sendAt: new Date((new Date()).getTime()),
                nameConversation: self.curConver.name
            };
            apiService.postMessage(message, self.token, function (res) {
            });
        }
        e && e.preventDefault();
        textMessage.val('');
    }
    textMessage.keypress(function (e) {
        if (e.which == 13 && !e.shiftKey) {
            send(e);
        }
    });
    this.enter = function() {
        if(self.curConver.lastMessFontWeight=='bolder') {
            self.curConver.lastMessFontWeight='100';
            self.numNewMess--;
            apiService.seenMessage({
                idUser: self.user.id,
                nameConversation: self.curConver.name
            }, self.token, function() {});
        }
    }
    this.sendMessage = function() {
        send();
    }
    this.fileName = function(path) {
        if(path)
        return path.substring(lengthUrl+35+self.curConver.name.length, path.length);
        return '';
    }
    this.upload = function (files) {
        async.forEachOfSeries(files, (file, i, _done) => {
            let type = file.type.substring(0, 5);
            apiService.upload({
                file: file,
                fields: {'name': self.curConver.name, 'width': WIDTH_IMAGE_THUMB}
            }, self.token, (res) => {
                if(res) {
                    console.log(res);
                    let message = {
                        content: res,
                        type: type=='image'?'image':'file',
                        idSender: self.user.id,
                        idConversation: self.curConver.id,
                        User: self.user,
                        sendAt: new Date((new Date()).getTime()),
                        nameConversation: self.curConver.name
                    }
                    apiService.postMessage(message, self.token, (res) => {
                        _done();
                    });
                } else {
                    console.log('UPLOAD FAIL');
                }
            })
        }, (err) => {

        });
    }

    this.thumb = function(path) {
        let p = path.slice(lengthUrl+1);
        return apiService.URL + '/api/thumb/'+p+'?token='+self.token;
    }
    this.download = function(path) {
        let p = path.slice(lengthUrl+1);
        return apiService.URL +'/api/download/'+p+'?token='+self.token;
    }
    socket.on('sendMessage', function(data) {
        $timeout(function() {
            console.log(data);
            self.listConver.filter(function(conver) { return conver.id==data.idConversation; })[0].Messages.push(data);
            $timeout(function(){
                listMessage.scrollTop(listMessage[0].scrollHeight);
            }, 500);
        })
    });

    this.getImageOrigin = function(path) {
        let p = path.slice(lengthUrl+1);
        return apiService.URL + '/api/imageOrigin/'+p+'?token='+self.token;
    }

    function preventXSS(text) {
        const rule = {
            '<': {
                regex: /\</g,
                replaceStr: '&lt'
            },
            '>' : {
                regex: /\>/g,
                replaceStr: '&gt'
            }
        };

        text = text.replace(rule['>'].regex, rule['>'].replaceStr);
        text = text.replace(rule['<'].regex, rule['<'].replaceStr);


        return text;

    }
}

let appRight = angular.module(rightSideModule, []);
appRight.component(rightSideComponent, {
    templateUrl: 'components/right-side/right-side.html',
    controller: Controller,
    controllerAs: rightSideComponent,
    bindings: {
        token: '<',
        user: '<',
        listConver: '=',
        curConver: '=',
        numNewMess: '='
    }
});
