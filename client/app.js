require('angular-ui-router');
require('angular-messages');
const angular = require('angular');

angular.module('HubApp', ['ui.router', 'ngMessages']).config(uiRouterSetup);

uiRouterSetup.$inject = ['$stateProvider', '$urlRouterProvider'];
function uiRouterSetup($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('users', {
            url: '/users',
            template: '<users></users>'
        })

    $urlRouterProvider.otherwise('/');
}
