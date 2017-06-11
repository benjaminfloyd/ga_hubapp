ShowExpenseController.$inject = ['$state', '$stateParams', 'ExpensesService']

function ShowExpenseController($state, $stateParams, ExpensesService) {

    var vm = this;

    function initialize() {
        const expenseIdToShow = $stateParams.expenseId;

        ExpensesService.getSingleExpenseById(expenseIdToShow)
            .then(
                function success(response) {
                    vm.expenseEntry = response.data;
                },
                function failure(response) {
                    console.log('Failed to retrieve information for Expense with ID of ' + expenseIdToShow)
                }
            )
    }
    initialize();

    vm.editExpenseEntry = function (expenseEntryId) {
        $state.go('edit_expense/:expenseId', { expenseId: expenseEntryId });
    }
}

module.exports = ShowExpenseController;
