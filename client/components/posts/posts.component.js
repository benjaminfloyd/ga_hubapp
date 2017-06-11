let expensesTemplate = require(__dirname + '/expenses.html');
let expensesController = require(__dirname + '/expenses.controller.js');

let ExpensesComponent = {
    template: expensesTemplate,
    controller: expensesController
}

angular.module('BudgetApp').component('expenses', ExpensesComponent);
