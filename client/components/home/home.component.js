const template = require('./home.html')
const controller = require('./home.controller.js')

const component = {
    template: template,
    controller: controller
}

angular
	  .module('HubApp')
	  .component('home', component);
