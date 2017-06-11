const editExpenseTemplate = require('./edit-expense.html')
const editExpenseController = require('./editExpense.controller')

const EditExpenseComponent = {
    template: editExpenseTemplate,
    controller: editExpenseController
}

angular
    .module('BudgetApp')
    .component('editExpense', EditExpenseComponent);
