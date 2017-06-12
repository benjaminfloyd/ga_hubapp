const createUserTemplate = require('./create-user.html')
const createUserController = require('./createUser.controller')

const CreateUserComponent = {
    template: createUserTemplate,
    controller: createUserController
}

angular
    .module('HubApp')
    .component('createUser', CreateUserComponent);
