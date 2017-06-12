var showUserTemplate = require('./show-user.html')
var showUserController = require('./showUser.controller')

const ShowUserComponent = {
    template: showUserTemplate,
    controller: showUserController
}

angular
    .module('HubApp')
    .component('showUser', ShowUserComponent);
