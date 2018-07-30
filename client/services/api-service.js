let moduleName = 'apiServiceModule';
let serviceName = 'apiService';

const LOGIN = '/login';
const REGISTER = '/register';
const GET_LIST_CONVERSATION = '/api/list/conversation';
const GET_CONVERSATION = '/api/conversation';
const POST_MESSAGE = '/api/message/new';
const SEEN_MESSAGE = '/api/seenMessage'
const UPLOAD = '/api/upload';
const THUMB = '/api/thumb';
angular.module(moduleName, []).service(serviceName, function ($http, Upload) {
    let doPost = function(URL, token, data, cb) {

        $http({
            method: 'POST',
            url: BASE_URL + URL,
            headers: URL==LOGIN?{}:{
                'Authorization': token
            },
            data: data
        }).then(function successCallback(response) {
                if (response.data.code != 200) {
                    console.error(response.data.reason);
                    cb();
                } else {
                    cb(response.data.content);
                }
        }, function errorCallback(response) {
            console.error(response);
            // if(toastr) toastr.error(response);
            cb();
        });
    }
    this.URL = BASE_URL;
    // this.register = function(data, cb) {
    //     $http({
    //         method: 'POST',
    //         url: REGISTER,
    //         data: data
    //     }).then(function successCallback(response) {
    //         if (response.data.code != 200) {
    //             console.error(response.data.reason);
    //             cb();
    //         } else {
    //             cb(response.data.content);
    //         }
    //     }, function errorCallback(response) {
    //         console.error(response);
    //         if(toastr) toastr.error(response);
    //         cb();
    //     });
    // }
    this.login = function(data, cb) {
        doPost(LOGIN, '', data, cb)
    }
    this.getConversation = function(token, data, cb){
        doPost(GET_CONVERSATION, token, data, cb);
    }
    this.getListConversation = function(token, data, cb) {
        doPost(GET_LIST_CONVERSATION, token, data, cb);
    }
    this.postMessage = (data, token, cb) => {
        doPost(POST_MESSAGE, token, data, cb);
    }
    this.seenMessage = (data, token, cb) => {
        doPost(SEEN_MESSAGE, token, data, cb);
    }
    this.upload = (data, token, cb) => {
        Upload.upload({
            url: UPLOAD,
            headers: {
                'Authorization': token
            },
            file: data.file,
            fields: data.fields
        }).then(
            (response) => {
                if (response.data.code != 200) {
                    console.error(response.data.reason);
                    cb();
                } else {
                    cb(response.data.content);
                }
            },
            (error) => {
                console.error(error);
                cb();
            });
    }
    this.thumb = (data, token, cb) => {
        doPost(THUMB, token, data, cb);
    };
    return this;
});
