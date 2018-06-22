let leftSideComponent = 'leftSide';
let leftSideModule = 'left-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    this.$onInit = function() {
    }
    this.fileName = function(path) {
        return path.substring(59+self.curConver.name.length, path.length);
    }
}

let appLeft = angular.module(leftSideModule, []);
appLeft.component(leftSideComponent, {
    templateUrl: 'components/left-side/left-side.html',
    controller: Controller,
    controllerAs: leftSideComponent,
    bindings: {
        user: '<',
        listConver: '<',
        curConver: '='
    }
});
