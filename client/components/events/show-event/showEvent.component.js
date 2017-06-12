var showEventTemplate = require('./show-event.html')
var showEventController = require('./showEvent.controller')

const ShowEventComponent = {
    template: showEventTemplate,
    controller: showEventController
}

angular
    .module('GA_HubApp')
    .component('showEvent', ShowEventComponent);
