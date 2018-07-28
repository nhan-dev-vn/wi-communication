(function () {
    let moduleName = 'uiModule';
    let serviceName = 'ui';

    const SEEN_MESSAGE = 'SEEN_MESSAGE'
    const SHOW_CONVERSATION = 'SHOW_CONVERSATION'
    angular.module(moduleName, []).service(serviceName, function ($rootScope) {
        
        this.showConversation = (conv) =>  {
            $rootScope.$emit(SHOW_CONVERSATION, conv)
        }

        this.onShowConversation = (cb) => {
            $rootScope.$on(SHOW_CONVERSATION, (e, dat) => {
                cb(dat)
            })
        }

        // this.seenMessage = (msg) => {
        //     $rootScope.$emit(SEEN_MESSAGE, msg)
        // }

        // this.onSeenMessage = (cb) => {
        //     $rootScope.$on(SEEN_MESSAGE, (e, dat) => {
        //         cb(dat)
        //     })
        // }


        return this;
    });

})()