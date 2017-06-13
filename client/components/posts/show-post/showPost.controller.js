ShowPostController.$inject = ['$state', '$stateParams', 'PostsService']

function ShowPostController($state, $stateParams, PostsService) {

    var vm = this;

    function initialize() {
        const postIdToShow = $stateParams.postId;

        PostsService.getSinglePostById(postIdToShow)
            .then(
            function success(response) {
                vm.postEntry = response.data;
                console.log(response.data);
            },
            function failure(response) {
                console.log('Failed to retrieve information for Post with ID of ' + expenseIdToShow)
            }
            )
    }
    initialize();

    vm.editPostEntry = function (postEntryId) {
        $state.go('edit_post/:postId', { postId: postEntryId });
    }
    
    vm.deletePostEntry = function (postIndexToDelete, postIdToDeleteFromDatabase) {
        PostsService.deleteIdFromDatabase(postIdToDeleteFromDatabase)
            .then(
            function success(response) {

                vm.postEntries.splice(postIndexToDelete, 1);
            },
            function failure(response) {

                console.log('Error deleting Post with ID of ' + postIdToDeleteFromDatabase);
            }
            )
    }
}

module.exports = ShowPostController;
