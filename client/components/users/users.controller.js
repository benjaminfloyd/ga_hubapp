UsersController.$inject = ['$http', '$state', '$stateParams', 'UsersService', '$scope'];

function UsersController($http, $state, $stateParams, UsersService, $scope) {

    let vm = this;

    function initialize() {
        getAllUsersFromDatabase();
    }
    initialize();

    function getAllUsersFromDatabase() {
        UsersService.getAllUsersFromDatabase()
            .then(
            function success(response) {
                vm.userEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving User Entries from database!');
            }
            );
    }

    vm.addUser = function () {

        const newUser = {
            amount: vm.newUserAmount,
            note: vm.newUserNote
        };

        UsersService.addNewUserToDatabase(newUser)
            .then(
                function success(response) {
                    const newUserFromDatabase = response.data;
                    vm.userEntries.push(newUserFromDatabase);
                    resetForm();
                },
                function failure(response) {
                    console.log('Error saving new User to database!');
                }
            )
    }

    vm.deleteUser = function (userIndexToDelete, userIdToDeleteFromDatabase) {

        UsersService.deleteIdFromDatabase(userIdToDeleteFromDatabase)
            .then(
                function success(response) {

                    vm.userEntries.splice(userIndexToDelete, 1);
                },
                function failure(response) {

                    console.log('Error deleting User with ID of ' + userIdToDeleteFromDatabase);
                }
            )
    }

    vm.showUser = function (userId) {
        $state.go('show_user/:userId', { userId: userId });
    }

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
