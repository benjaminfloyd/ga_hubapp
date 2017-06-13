PostsController.$inject = ['$http', '$state', '$stateParams', 'PostsService', '$scope'];

function PostsController($http, $state, $stateParams, PostsService, $scope) {

    let vm = this;
    vm.companyName = '';
    vm.positionTitle = '';
    vm.jobDescription = '';
    vm.dateAvailable = '';
    vm.postEntries = [];

    function initialize() {
        console.log('Post Controller Working');

        getAllPostsFromDatabase();
    }
    initialize();

    function getAllPostsFromDatabase() {
        PostsService.getAllPostsFromDatabase()
            .then(
            function success(response) {
                vm.postEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Post Entries from database!');
            }
            );
    }

    vm.addPost = function () {

        const newPost = {
            company_name: vm.companyName,
            position_title: vm.positionTitle,
            job_description: vm.jobDescription,
            date_available: vm.dateAvailable
        };

        PostsService.addNewPostToDatabase(newPost)
            .then(
            function success(response) {
                const newPostFromDatabase = response.data;
                vm.postEntries.push(newPostFromDatabase);
                resetForm();
            },
            function failure(response) {

                console.log('Error saving new Post to database!');
            }
            )
    }

    vm.deletePost = function (postIndexToDelete, postIdToDeleteFromDatabase) {

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

    vm.showPost = function (postId) {
        $state.go('show_post/:postId', { postId: postId });
    }

    function resetForm() {
        vm.companyName = '';
        vm.positionTitle = '';
        vm.jobDescription = '';
        vm.dateAvailable = '';
    }

    vm.totalPosts = function () {
        if (vm.postEntries) {
            let totalPosts = vm.postEntries.reduce(function (totalPosts, postEntry) {
                return totalPosts + postEntry.amount;
            }, 0)

            return totalPosts;
        }
    }

}

module.exports = PostsController;
