ShowCreditController.$inject = ['$state', '$stateParams', 'CreditsService']

function ShowCreditController($state, $stateParams, CreditsService) {

    var vm = this;

    function initialize() {
        const creditIdToShow = $stateParams.creditId;

        CreditsService.getSingleCreditById(creditIdToShow)
            .then(
                function success(response) {
                    vm.creditEntry = response.data;
                },
                function failure(response) {
                    console.log('Failed to retrieve information for Credit with ID of ' + creditIdToShow)
                }
            )
    }
    initialize();

    vm.editCreditEntry = function (creditEntryId) {
        $state.go('edit_credit/:creditId', { creditId: creditEntryId });
    }
}

module.exports = ShowCreditController;
