PostsService.$inject = ['$http']

function PostsService($http) {
    var self = this;

    self.getAllPostsFromDatabase = function () {
        return $http.get('posts/');
    }

    self.addNewPostToDatabase = function (newPost) {
        return $http.post('posts/', newPost);
    }

    self.deleteIdFromDatabase = function (postIdToDeleteFromDatabase) {
        return $http.delete('posts/' + postIdToDeleteFromDatabase);
    }

    self.getSinglePostById = function (postIdToShow) {
        return $http.get('posts/' + postIdToShow);
    }

    self.updateSinglePost = function (postToUpdate) {
        return $http.patch('posts/', postToUpdate);
    }
}

angular
    .module('HubApp')
    .service('PostsService', PostsService);
