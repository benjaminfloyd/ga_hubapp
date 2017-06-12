const homeController = require('/home.controller.js');
const homeTemplate = require('/home.html');

const HomeComponent = {
	controller: homeController,
	template: homeTemplate
};

angular
	.module('HubApp')
	.component('home', HomeComponent);
