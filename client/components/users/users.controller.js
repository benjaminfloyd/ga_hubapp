CreditsController.$inject = ['$http', '$state', '$stateParams', 'CreditsService', '$scope'];

function CreditsController($http, $state, $stateParams, CreditsService, $scope) {

    let vm = this;

    /**
     * We will run this function the first time we load our component.
     *
     * We can use an 'initialize' function to pre-load some data
     * from the database.
     */
    function initialize() {
        getAllCreditsFromDatabase();
    }
    initialize();

    // this function grabs all of the credits from the database
    // via an AJAX call
    function getAllCreditsFromDatabase() {
        CreditsService.getAllCreditsFromDatabase()
            .then(
            function success(response) {
                // if the call is successful, return the list of credits
                vm.creditEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Credit Entries from database!');
            }
            );
    }

    // This function handles our form submission.
    vm.addCredit = function () {

        // the new Credit object will be created by binding to the form inputs
        const newCredit = {
            amount: vm.newCreditAmount,
            note: vm.newCreditNote
        };

        // Make an ajax call to save the new Credit to the database:
        CreditsService.addNewCreditToDatabase(newCredit)
            .then(
                function success(response) {
                    // only push to the creditEntries array if the ajax call is successful
                    const newCreditFromDatabase = response.data;
                    vm.creditEntries.push(newCreditFromDatabase);
                    // then reset the form so we can submit more credits
                    resetForm();
                },
                function failure(response) {
                    // if the http call is not successful, log the error
                    // DO NOT clear the form
                    // DO NOT push the new object to the array
                    console.log('Error saving new Credit to database!');
                }
            )
    }

    vm.deleteCredit = function (creditIndexToDelete, creditIdToDeleteFromDatabase) {

        CreditsService.deleteIdFromDatabase(creditIdToDeleteFromDatabase)
            .then(
                function success(response) {
                    // only delete the Credit from the Angular array if
                    // it was successfully deleted from the database
                    vm.creditEntries.splice(creditIndexToDelete, 1);
                },
                function failure(response) {
                    // DO NOT delete the Credit from the Angular array if the
                    // credit is not successfully deleted from the database
                    console.log('Error deleting Credit with ID of ' + creditIdToDeleteFromDatabase);
                }
            )
    }

    vm.showCredit = function (creditId) {
        $state.go('show_credit/:creditId', { creditId: creditId });
    }

    // this function can be used to clear the credits form
    function resetForm() {
        vm.newCreditAmount = '';
        vm.newCreditNote = '';
    }

    vm.totalCredits = function () {
        if (vm.creditEntries) {
            let totalCredits = vm.creditEntries.reduce(function (totalCredits, creditEntry) {
                return totalCredits + creditEntry.amount;
            }, 0)

            return totalCredits;
        }
    }
}

module.exports = CreditsController;
