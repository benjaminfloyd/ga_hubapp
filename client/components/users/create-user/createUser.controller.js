CreateUserController.$inject = ['$state', '$stateParams', 'UsersService'];

function CreateUserController($state, $stateParams, UsersService) {
    console.log('create user controller working')
    var vm = this;

    function initialize() {
        const userEntryId = $stateParams.userId;

        UsersService.getSingleUserById(userEntryId).then(
            function success(response) {
                vm.userToUpdate = response.data;
            },
            function failure(response) {
                console.log('Could not retrieve User with ID of ' + userEntryId);
            }
        )
    }
    initialize();

    vm.updateUserInformation = function () {
        UsersService.updateSingleUser(
            vm.userToUpdate
        ).then(
            function success(response) {
                $state.go('show_user/:userId', { userId: vm.userToUpdate._id });
            },
            function failure(response) {
                console.log('Failed to updated User with ID of ' + userEntryId);
            }
        )
    }
}

module.exports = CreateUserController;
