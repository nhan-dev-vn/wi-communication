let rightSideComponent = 'rightSide';
let rightSideModule = 'right-side';

function Controller(apiService, $timeout, $element){
    let self = this;
    
}

let appRight = angular.module(rightSideModule, []);
appRight.component(rightSideComponent, {
    templateUrl: 'components/right-side/right-side.html',
    controller: Controller,
    controllerAs: rightSideComponent,
    bindings: {
        username: '<',
        listConver: '<',
        curConver: '='
    }
});
