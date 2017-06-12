const editUserTemplate = require('./edit-user.html')
const editUserController = require('./editUser.controller')

const EditUserComponent = {
    template: editUserTemplate,
    controller: editUserController
}

angular
    .module('HubApp')
    .component('editUser', EditUserComponent);
