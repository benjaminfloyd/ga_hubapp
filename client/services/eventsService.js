EventsService.$inject = ['$http']

function EventsService($http) {
    var self = this;

    self.getAllEventsFromDatabase = function () {
        return $http.get('events/');
    }

    self.addNewEventToDatabase = function (newEvent) {
        console.log(newEvent)
        return $http.post('events/', newEvent);
    }

    self.deleteIdFromDatabase = function (eventIdToDeleteFromDatabase) {
        return $http.delete('events/' + eventIdToDeleteFromDatabase);
    }

    self.getSingleEventById = function (eventIdToShow) {
        return $http.get('events/' + eventIdToShow);
    }

    self.updateSingleEvent = function (eventToUpdate) {
        return $http.patch('events/', eventToUpdate);
    }
}

angular
    .module('HubApp')
    .service('EventsService', EventsService);
