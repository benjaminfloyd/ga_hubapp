ShowEventController.$inject = ['$state', '$stateParams', 'EventsService']

function ShowEventController($state, $stateParams, EventsService) {

    var vm = this;

    function initialize() {
        const eventIdToShow = $stateParams.eventId;

        EventsService.getSingleEventById(eventIdToShow)
            .then(
                function success(response) {
                    vm.eventEntry = response.data;
                },
                function failure(response) {
                    console.log('Failed to retrieve information for Event with ID of ' + eventIdToShow)
                }
            )
    }
    initialize();

    vm.editEventEntry = function (eventEntryId) {
        $state.go('edit_event/:eventId', { eventId: eventEntryId });
    }
}

module.exports = ShowEventController;
