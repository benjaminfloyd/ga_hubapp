ExpensesController.$inject = ['$http', '$state', '$stateParams', 'ExpensesService', '$scope'];

function ExpensesController($http, $state, $stateParams, ExpensesService, $scope) {

    let vm = this;

    /**
     * We will run this function the first time we load our component.
     *
     * We can use an 'initialize' function to pre-load some data
     * from the database.
     */
    function initialize() {
        getAllExpensesFromDatabase();
    }
    initialize();

    // this function grabs all of the expenses from the database
    // via an AJAX call
    function getAllExpensesFromDatabase() {
        ExpensesService.getAllExpensesFromDatabase()
            .then(
            function success(response) {
                // if the call is successful, return the list of expenses
                vm.expenseEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Expense Entries from database!');
            }
            );
    }

    // This function handles our form submission.
    vm.addExpense = function () {

        // the new Expense object will be created by binding to the form inputs
        const newExpense = {
            amount: vm.newExpenseAmount,
            note: vm.newExpenseNote
        };

        // Make an ajax call to save the new Expense to the database:
        ExpensesService.addNewExpenseToDatabase(newExpense)
            .then(
                function success(response) {
                    // only push to the expenseEntries array if the ajax call is successful
                    const newExpenseFromDatabase = response.data;
                    vm.expenseEntries.push(newExpenseFromDatabase);
                    // then reset the form so we can submit more expenses
                    resetForm();
                },
                function failure(response) {
                    // if the http call is not successful, log the error
                    // DO NOT clear the form
                    // DO NOT push the new object to the array
                    console.log('Error saving new Expense to database!');
                }
            )
    }

    vm.deleteExpense = function (expenseIndexToDelete, expenseIdToDeleteFromDatabase) {

        ExpensesService.deleteIdFromDatabase(expenseIdToDeleteFromDatabase)
            .then(
                function success(response) {
                    // only delete the Expense from the Angular array if
                    // it was successfully deleted from the database
                    vm.expenseEntries.splice(expenseIndexToDelete, 1);
                },
                function failure(response) {
                    // DO NOT delete the Expense from the Angular array if the
                    // expense is not successfully deleted from the database
                    console.log('Error deleting Expense with ID of ' + expenseIdToDeleteFromDatabase);
                }
            )
    }

    vm.showExpense = function (expenseId) {
        $state.go('show_expense/:expenseId', { expenseId: expenseId });
    }

    // this function can be used to clear the expenses form
    function resetForm() {
        vm.newExpenseAmount = '';
        vm.newExpenseNote = '';
    }

    vm.totalExpenses = function () {
        if (vm.expenseEntries) {
            let totalExpenses = vm.expenseEntries.reduce(function (totalExpenses, expenseEntry) {
                return totalExpenses + expenseEntry.amount;
            }, 0)

            return totalExpenses;
        }
    }

}

module.exports = ExpensesController;
