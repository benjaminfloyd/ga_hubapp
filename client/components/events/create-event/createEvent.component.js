const editCreditTemplate = require('./edit-credit.html')
const editCreditController = require('./editCredit.controller')

const EditCreditComponent = {
    template: editCreditTemplate,
    controller: editCreditController
}

angular
    .module('BudgetApp')
    .component('editCredit', EditCreditComponent);
