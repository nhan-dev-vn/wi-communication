(function () {
    const componentName = 'chatMessage';
    const moduleName = 'chat-message';
    const iconTextRules = {
        "angry-1": {
            "icon": "angry-1-icon",
            "text-replace": [":@"]
        },
        "angry": {
            "icon": "angry-icon",
            "text-replace": [":-@"]
        },
        "bored-1": {
            "icon": "bored-1-icon",
            "text-replace": [":|"]
        },
        "bored-2": {
            "icon": "bored-2-icon",
            "text-replace": ["|-)"]
        },
        "bored": {
            "icon": "bored-icon",
            "text-replace": [":-|"]
        },
        "confused-1": {
            "icon": "confused-1-icon",
            "text-replace": [":?"]
        },
        "confused": {
            "icon": "confused-icon",
            "text-replace": [":-?"]
        },
        "crying-1": {
            "icon": "crying-1-icon",
            "text-replace": [":'("]
        },
        "crying": {
            "icon": "crying-icon",
            "text-replace": [":("]
        },
        "embarrassed": {
            "icon": "embarrassed-icon",
            "text-replace": []
        },
        "emoticons": {
            "icon": "emoticons-icon",
            "text-replace": []
        },
        "happy-1": {
            "icon": "happy-1-icon",
            "text-replace": []
        },
        "happy-2": {
            "icon": "happy-2-icon",
            "text-replace": []
        },
        "happy-3": {
            "icon": "happy-3-icon",
            "text-replace": []
        },
        "happy-4": {
            "icon": "happy-4-icon",
            "text-replace": []
        },
        "happy": {
            "icon": "happy-icon",
            "text-replace": []
        },
        "ill": {
            "icon": "ill-icon",
            "text-replace": []
        },
        "in-love": {
            "icon": "in-love-icon",
            "text-replace": []
        },
        "kissing": {
            "icon": "kissing-icon",
            "text-replace": [":*"]
        },
        "mad": {
            "icon": "mad-icon",
            "text-replace": []
        },
        "nerd": {
            "icon": "nerd-icon",
            "text-replace": []
        },
        "ninja": {
            "icon": "ninja-icon",
            "text-replace": []
        },
        "quiet": {
            "icon": "quiet-icon",
            "text-replace": []
        },
        "sad": {
            "icon": "sad-icon",
            "text-replace": [")-)"]
        },
        "secret": {
            "icon": "secret-icon",
            "text-replace": []
        },
        "smart": {
            "icon": "smart-icon",
            "text-replace": ["8-)"]
        },
        "smile": {
            "icon": "smile-icon",
            "text-replace": [":))", ":)"]
        },
        "smiling": {
            "icon": "smiling-icon",
            "text-replace": [":-)"]
        },
        "surprised-1": {
            "icon": "surprised-1-icon",
            "text-replace": [":-o"]
        },
        "surprised": {
            "icon": "surprised-icon",
            "text-replace": [":o"]
        },
        "suspicious-1": {
            "icon": "suspicious-1-icon",
            "text-replace": [":-/"]
        },
        "suspicious": {
            "icon": "suspicious-icon",
            "text-replace": [":/"]
        },
        "tongue-out-1": {
            "icon": "tongue-out-1-icon",
            "text-replace": [":-P"]
        },
        "tongue-out": {
            "icon": "tongue-out-icon",
            "text-replace": [":P"]
        },
        "unhappy": {
            "icon": "unhappy-icon",
            "text-replace": [":(("]
        },
        "wink": {
            "icon": "wink-icon",
            "text-replace": [";)"]
        }
    };

    Controller.$inject = [];
    function Controller() {
        let self = this;

        const rules = Object.entries(iconTextRules);
        const regex = toRegex();
        // const regex = /(\:\)\))|(\:\-\))/g;

        self.$onInit = function () {
            preProcess();
        }

        function preProcess() {
            self.text = replaceText(self.text);
            // console.log({'self.text': self.text})
        }


        //change str -> regexable str
        function preRegex(str) {
            //console.log({str})
            return str
                .split('') //to list char
                .reduce((pre, cur) => `${pre}\\${cur}`, ''); //to string with \ attach to each char
        }

        function toRegex() {

            const listIcon = rules
                .reduce((pre, cur) => {

                    // if(!pre.length) return cur[1];


                    // const preIcons = pre[1]["text-replace"];
                    const curIcons = cur[1]["text-replace"];


                    // //console.log({pre, cur, curIcons});

                    return [...pre, ...curIcons];
                }, [])
            //console.log({listIcon});
            const regexStr = listIcon
                .reduce((pre, cur, i) => {
                    // //console.log({pre, cur, i})
                    const cur_regex_str = preRegex(cur);

                    if (i === 0) return pre + cur_regex_str;

                    let str = `${pre}|${cur_regex_str}`;

                    if (i === listIcon.length - 1) str += ')';

                    return str;

                }, '(')

            // const regexStr = listIcon
            //     .reduce((pre, cur, i) => {
            //         // //console.log({pre, cur, i})
            //         const cur_regex_str = `(${preRegex(cur)})`;

            //         if (i === 0) return pre + cur_regex_str;

            //         let str = `${pre}|${cur_regex_str}`;

            //         if (i === listIcon.length - 1) str += ')';

            //         return str;

            //     }, '(')

            //console.log({regexStr});
            return new RegExp(regexStr, 'g');

        }

        // function findStr(icon) {
        //     const obj = rules.find(o => o[1].icon === icon);

        //     if (obj) return obj["text-replace"];

        //     return null;
        // }

        function findIcon(text) {
            //console.log('===findIcon==');

            const obj = rules
                .filter(o => {
                    const listIcons = o[1]["text-replace"];
                    // //console.log({'o[1][text-replace]': o[1]["text-replace"]});

                    return !!listIcons.filter(i => i === text).length;
                })[0]

            // //console.log({text});
            // //console.log({rules});
            //console.log('obj');
            //console.log();

            //console.log('XXXX findIcon XXXX');

            if (obj) return obj[1].icon;
            return null;
        }

        //without html
        // function replaceText(str) {
        //     const listIconsVerbose = str.match(regex);
        //     //console.log({listIconsVerbose});
        //     //remove duplicate
        //     const listIcons = listIconsVerbose.filter((val, i) => listIconsVerbose.indexOf(val) === i);

        //     //console.log({listIcons});

        //     let result = str;
        //     for (let icon of listIcons) {
        //         const _regex = new RegExp(preRegex(icon));
        //         const replaceIcon = findIcon(icon);
        //         //console.log({replaceIcon});
        //         if(replaceIcon) result = result.replace(_regex, replaceIcon);
        //     }

        //     return result;
        // }

        function replaceText(str) {

            if(!str) return str;

            const listIconsVerbose = str.match(regex);
            //console.log({listIconsVerbose});
            //remove duplicate
            if (!listIconsVerbose || !listIconsVerbose.length) return str;

            const listIcons = listIconsVerbose.filter((val, i) => listIconsVerbose.indexOf(val) === i);

            //console.log({listIcons});

            let result = str;
            for (let icon of listIcons) {
                const _regex = new RegExp(preRegex(icon));
                const replaceIcon = findIcon(icon);
                const iconHtml = toHtmlWithIcon(replaceIcon);
                //console.log({replaceIcon});
                if (replaceIcon) result = result.replace(_regex, iconHtml);
            }

            return result;
        }

        function toHtmlWithIcon(className) {
            return `<div class="${className}"></div>`
        }
    }


    let app = angular.module(moduleName, []);
    app.component(componentName, {
        templateUrl: 'components/chat-message/chat-message.html',
        controller: Controller,
        controllerAs: componentName,
        bindings: {
            text: '<'
        }
    });

})()