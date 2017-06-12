require('angular-ui-router');
require('angular-messages');
const angular = require('angular');

angular.module('HubApp', ['ui.router', 'ngMessages']).config(uiRouterSetup);

uiRouterSetup.$inject = ['$stateProvider', '$urlRouterProvider'];
function uiRouterSetup($stateProvider, $urlRouterProvider) {
    console.log('test');
    $stateProvider
         .state('home', {
            url: '/',
            template: '<h1>Hello</h1>'
        })
        .state('users', {
            url: '/users',
            template: '<users></users>'
        })
        .state('posts', {
            url: '/post',
            template: '<posts></posts>'
        })
        .state('show_post/:postId', {
            url: '/show_post/:postId',
            params: [ 'postId' ],
            template: '<show-post></show-post>'
        })
        .state('edit_post/:postId', {
            url: '/edit_post/:postId',
            params: [ 'postId' ],
            template: '<edit-post></edit-post>'
        })
          .state('events', {
            url: '/events',
            template: '<events></events>'
        })
        .state('show_event/:eventId', {
            url: '/show_event/:eventId',
            params: [ 'eventId' ],
            template: '<show-event></show-event>'
        })
        .state('edit_event/:eventId', {
            url: '/edit_event/:eventId',
            params: [ 'eventId' ],
            template: '<edit-event></edit-event>'
        });

    $urlRouterProvider.otherwise('/');
}
