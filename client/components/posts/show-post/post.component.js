var showExpenseTemplate = require('./show-expense.html')
var showExpenseController = require('./showExpense.controller')

const ShowExpenseComponent = {
    template: showExpenseTemplate,
    controller: showExpenseController
}

angular
    .module('BudgetApp')
    .component('showExpense', ShowExpenseComponent);
