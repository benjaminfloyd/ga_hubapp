EditEventController.$inject = ['$state', '$stateParams', 'EventsService'];

function EditEventController($state, $stateParams, EventsService) {

    var vm = this;

    function initialize() {
        const eventEntryId = $stateParams.eventId;

        EventsService.getSingleEventById(eventEntryId).then(
            function success(response) {
                vm.eventToUpdate = response.data;
            },
            function failure(response) {
                console.log('Could not retrieve Event with ID of ' + eventEntryId);
            }
        )
    }
    initialize();

    vm.updateEventInformation = function () {
        EventsService.updateSingleEvent(
            vm.eventToUpdate
        ).then(
            function success(response) {
                $state.go('show_event/:eventId', { eventId: vm.eventToUpdate._id });
            },
            function failure(response) {
                console.log('Failed to updated Event with ID of ' + eventEntryId);
            }
        )
    }
}

module.exports = EditEventController;
