var showCreditTemplate = require('./show-credit.html')
var showCreditController = require('./showCredit.controller')

const ShowCreditComponent = {
    template: showCreditTemplate,
    controller: showCreditController
}

angular
    .module('BudgetApp')
    .component('showCredit', ShowCreditComponent);
