let creditsTemplate = require(__dirname + '/credits.html');
let creditsController = require(__dirname + '/credits.controller.js');

let CreditsComponent = {
    template: creditsTemplate,
    controller: creditsController
}

angular.module('BudgetApp').component('credits', CreditsComponent);
