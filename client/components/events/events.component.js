let eventsTemplate = require(__dirname + '/events.html');
let eventsController = require(__dirname + '/events.controller.js');

let EventsComponent = {
    template: eventsTemplate,
    controller: eventsController
}

angular.module('GA_HubApp').component('events', EventsComponent);
