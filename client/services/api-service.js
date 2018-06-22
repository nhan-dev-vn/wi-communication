let moduleName = 'apiServiceModule';
let serviceName = 'apiService';
const URL = 'http://13.251.24.65:5005';
const LOGIN = URL + '/login';
const GET_LIST_CONVERSATION = URL + '/api/list/conversation';
angular.module(moduleName, []).service(serviceName, function ($http) {
    
    let doPost = function(URL, token, data, cb) {
        $http({
            method: 'POST',
            url: URL,
            headers: {
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
    
    this.login = function(data, cb) {
        $http({
            method: 'POST',
            url: LOGIN,
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
            if(toastr) toastr.error(response);
            cb();
        });
    }
    this.getListConversation = function(token, data, cb) {
        doPost(GET_LIST_CONVERSATION, token, data, cb);
    }
    return this;
});