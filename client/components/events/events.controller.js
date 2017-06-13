EventsController.$inject = ['$http', '$state', '$stateParams', 'EventsService', '$scope'];

function EventsController($http, $state, $stateParams, EventsService, $scope) {

    let vm = this;
    vm.eventName = '';
    vm.eventLocation = '';
    vm.eventDescription = '';
    vm.eventDate = '';
    vm.eventCost = '';
    vm.eventEntries = [];

    function initialize() {

        console.log('Events Controller Working');
        getAllEventsFromDatabase();
    }
    initialize();

    function getAllEventsFromDatabase() {
        EventsService.getAllEventsFromDatabase()
            .then(
            function success(response) {
                vm.eventEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Event Entries from database!');
            }
            );
    }

    vm.addEvent = function () {
    
        const newEvent = {
            event_name: vm.eventName,
            event_location: vm.eventLocation,
            event_description: vm.eventDescription,
            event_date: vm.eventDate,
            event_cost: vm.eventCost
            
        };

        EventsService.addNewEventToDatabase(newEvent)
            .then(
                function success(response) {
                    const newEventFromDatabase = response.data;
                    vm.eventEntries.push(newEventFromDatabase);
                    resetForm();
                },
                function failure(response) {

                    console.log('Error saving new Event to database!');
                }
            )
    }

    vm.deleteEvent = function (eventIndexToDelete, eventIdToDeleteFromDatabase) {

        EventsService.deleteIdFromDatabase(eventIdToDeleteFromDatabase)
            .then(
                function success(response) {

                    vm.eventEntries.splice(eventIndexToDelete, 1);
                },
                function failure(response) {

                    console.log('Error deleting Event with ID of ' + eventIdToDeleteFromDatabase);
                }
            )
    }

    vm.showEvent = function (eventId) {
        $state.go('show_event/:eventId', { eventId: eventId });
    }

    function resetForm() {
        vm.eventName = '';
        vm.eventLocation = '';
        vm.eventDescription = '';
        vm.eventDate = '';
        vm.eventCost = '';
    }

    vm.totalEvents = function () {
        if (vm.eventEntries) {
            let totalEvents = vm.eventEntries.reduce(function (totalEvents, eventEntry) {
                return totalEvents + eventEntry.amount;
            }, 0)

            return totalEvents;
        }
    }
}

module.exports = EventsController;
