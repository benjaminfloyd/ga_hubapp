EditPostController.$inject = ['$state', '$stateParams', 'PostsService'];

function EditPostController($state, $stateParams, PostsService) {

    var vm = this;

    function initialize() {
        const postEntryId = $stateParams.postId;

        PostsService.getSinglePostById(postEntryId).then(
            function success(response) {
                vm.postToUpdate = response.data;
            },
            function failure(response) {
                console.log('Could not retrieve Post with ID of ' + postEntryId);
            }
        )
    }
    initialize();

    vm.updatePostInformation = function () {
        PostsService.updateSinglePost(
            vm.postToUpdate
        ).then(
            function success(response) {
                $state.go('show_post/:postId', { postId: vm.postToUpdate._id });
            },
            function failure(response) {
                console.log('Failed to updated Post with ID of ' + postEntryId);
            }
        )
    }
}

module.exports = EditPostController;
