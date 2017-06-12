EventsController.$inject = ['$http', '$state', '$stateParams', 'EventsService', '$scope'];

function EventsController($http, $state, $stateParams, EventsService, $scope) {

    let vm = this;

    /**
     * We will run this function the first time we load our component.
     *
     * We can use an 'initialize' function to pre-load some data
     * from the database.
     */
    function initialize() {
        getAllEventsFromDatabase();
    }
    initialize();

    // this function grabs all of the events from the database
    // via an AJAX call
    function getAllEventsFromDatabase() {
        EventsService.getAllEventsFromDatabase()
            .then(
            function success(response) {
                // if the call is successful, return the list of events
                vm.EventEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Event Entries from database!');
            }
            );
    }

    // This function handles our form submission.
    vm.addEvent = function () {

        // the new Event object will be created by binding to the form inputs
        const newEvent = {
            amount: vm.newEventAmount,
            note: vm.newEventNote
        };

        // Make an ajax call to save the new Event to the database:
        EventsService.addNewEventToDatabase(newEvent)
            .then(
                function success(response) {
                    // only push to the eventEntries array if the ajax call is successful
                    const newEventFromDatabase = response.data;
                    vm.eventEntries.push(newEventFromDatabase);
                    // then reset the form so we can submit more events
                    resetForm();
                },
                function failure(response) {
                    // if the http call is not successful, log the error
                    // DO NOT clear the form
                    // DO NOT push the new object to the array
                    console.log('Error saving new Event to database!');
                }
            )
    }

    vm.deleteEvent = function (eventIndexToDelete, eventIdToDeleteFromDatabase) {

        EventsService.deleteIdFromDatabase(eventIdToDeleteFromDatabase)
            .then(
                function success(response) {
                    // only delete the Event from the Angular array if
                    // it was successfully deleted from the database
                    vm.eventEntries.splice(eventIndexToDelete, 1);
                },
                function failure(response) {
                    // DO NOT delete the Event from the Angular array if the
                    // event is not successfully deleted from the database
                    console.log('Error deleting Event with ID of ' + eventIdToDeleteFromDatabase);
                }
            )
    }

    vm.showEvent = function (eventId) {
        $state.go('show_event/:eventId', { eventId: eventId });
    }

    // this function can be used to clear the events form
    function resetForm() {
        vm.newEventAmount = '';
        vm.newEventNote = '';
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
