EditCreditController.$inject = ['$state', '$stateParams', 'CreditsService'];

function EditCreditController($state, $stateParams, CreditsService) {

    var vm = this;

    function initialize() {
        const creditEntryId = $stateParams.creditId;

        CreditsService.getSingleCreditById(creditEntryId).then(
            function success(response) {
                vm.creditToUpdate = response.data;
            },
            function failure(response) {
                console.log('Could not retrieve Credit with ID of ' + creditEntryId);
            }
        )
    }
    initialize();

    vm.updateCreditInformation = function () {
        CreditsService.updateSingleCredit(
            vm.creditToUpdate
        ).then(
            function success(response) {
                // redirect to the individual credit page when successfully updated
                $state.go('show_credit/:creditId', { creditId: vm.creditToUpdate._id });
            },
            function failure(response) {
                console.log('Failed to updated Credit with ID of ' + creditEntryId);
            }
        )
    }
}

module.exports = EditCreditController;
