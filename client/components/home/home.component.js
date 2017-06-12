<<<<<<< HEAD
const template = require('./home.html');
const controller = require('./home.controller.js');
=======
const homeController = require('/home.controller.js');
const homeTemplate = require('/home.html');
>>>>>>> ba7954f7609d35d4d8b084f65f2f4b056ccf2c14

const HomeComponent = {
	controller: homeController,
	template: homeTemplate
};

angular
	.module('HubApp')
	.component('home', HomeComponent);