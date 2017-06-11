EditExpenseController.$inject = ['$state', '$stateParams', 'ExpensesService'];

function EditExpenseController($state, $stateParams, ExpensesService) {

    var vm = this;

    function initialize() {
        const expenseEntryId = $stateParams.expenseId;

        ExpensesService.getSingleExpenseById(expenseEntryId).then(
            function success(response) {
                vm.expenseToUpdate = response.data;
            },
            function failure(response) {
                console.log('Could not retrieve Expense with ID of ' + expenseEntryId);
            }
        )
    }
    initialize();

    vm.updateExpenseInformation = function () {
        ExpensesService.updateSingleExpense(
            vm.expenseToUpdate
        ).then(
            function success(response) {
                // redirect to the individual expense page when successfully updated
                $state.go('show_expense/:expenseId', { expenseId: vm.expenseToUpdate._id });
            },
            function failure(response) {
                console.log('Failed to updated Expense with ID of ' + expenseEntryId);
            }
        )
    }
}

module.exports = EditExpenseController;
