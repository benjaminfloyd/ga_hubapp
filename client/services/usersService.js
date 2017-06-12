UsersService.$inject = ['$http']

function UsersService($http) {
    var self = this;

    self.getAllUsersFromDatabase = function () {
        return $http.get('users/');
    }

    self.addNewUserToDatabase = function (newUser) {
        return $http.post('users/', newUser);
    }

    self.deleteIdFromDatabase = function (userIdToDeleteFromDatabase) {
        return $http.delete('users/' + userIdToDeleteFromDatabase);
    }

    self.getSingleUserById = function (userIdToShow) {
        return $http.get('users/' + userIdToShow);
    }

    self.updateSingleUser = function (userToUpdate) {
        return $http.patch('users/', userToUpdate);
    }
}

angular
    .module('HubApp')
    .service('UsersService', UsersService);
