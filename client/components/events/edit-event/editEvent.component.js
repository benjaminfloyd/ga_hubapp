const editEventTemplate = require('./edit-event.html')
const editEventController = require('./editEvent.controller')

const EditEventComponent = {
    template: editEventTemplate,
    controller: editEventController
}

angular
    .module('HubApp')
    .component('editEvent', EditEventComponent);
