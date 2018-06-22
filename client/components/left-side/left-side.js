let leftSideComponent = 'leftSide';
let leftSideModule = 'left-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    this.$onInit = function() {
    }
}

let appLeft = angular.module(leftSideModule, []);
appLeft.component(leftSideComponent, {
    templateUrl: 'components/left-side/left-side.html',
    controller: Controller,
    controllerAs: leftSideComponent,
    bindings: {
        username: '<',
        listConver: '<',
        curConver: '='
    }
});
