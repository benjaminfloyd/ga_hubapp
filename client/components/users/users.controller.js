UsersController.$inject = ['$http', '$state', '$stateParams', 'UsersService', '$scope'];

function UsersController($http, $state, $stateParams, UsersService, $scope) {

    let vm = this;

    /**
     * We will run this function the first time we load our component.
     *
     * We can use an 'initialize' function to pre-load some data
     * from the database.
     */
    function initialize() {
        getAllUsersFromDatabase();
    }
    initialize();

    // this function grabs all of the users from the database
    // via an AJAX call
    function getAllUsersFromDatabase() {
        UsersService.getAllUsersFromDatabase()
            .then(
            function success(response) {
                // if the call is successful, return the list of users
                vm.userEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving User Entries from database!');
            }
            );
    }

    // This function handles our form submission.
    vm.addUser = function () {

        // the new User object will be created by binding to the form inputs
        const newUser = {
            amount: vm.newUserAmount,
            note: vm.newUserNote
        };

        // Make an ajax call to save the new User to the database:
        UsersService.addNewUserToDatabase(newUser)
            .then(
                function success(response) {
                    // only push to the userEntries array if the ajax call is successful
                    const newUserFromDatabase = response.data;
                    vm.userEntries.push(newUserFromDatabase);
                    // then reset the form so we can submit more users
                    resetForm();
                },
                function failure(response) {
                    // if the http call is not successful, log the error
                    // DO NOT clear the form
                    // DO NOT push the new object to the array
                    console.log('Error saving new User to database!');
                }
            )
    }

    vm.deleteUser = function (userIndexToDelete, userIdToDeleteFromDatabase) {

        UsersService.deleteIdFromDatabase(userIdToDeleteFromDatabase)
            .then(
                function success(response) {
                    // only delete the User from the Angular array if
                    // it was successfully deleted from the database
                    vm.userEntries.splice(userIndexToDelete, 1);
                },
                function failure(response) {
                    // DO NOT delete the User from the Angular array if the
                    // user is not successfully deleted from the database
                    console.log('Error deleting User with ID of ' + userIdToDeleteFromDatabase);
                }
            )
    }

    vm.showUser = function (userId) {
        $state.go('show_user/:userId', { userId: userId });
    }

    // this function can be used to clear the credits form
    function resetForm() {
        vm.newUserAmount = '';
        vm.newUserNote = '';
    }

    vm.totalUsers = function () {
        if (vm.userEntries) {
            let totalUsers = vm.userEntries.reduce(function (totalUsers, userEntry) {
                return totalUsers + userEntry.amount;
            }, 0)

            return totalUsers;
        }
    }
}

module.exports = UsersController;
