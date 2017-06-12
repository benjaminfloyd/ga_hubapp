PostsController.$inject = ['$http', '$state', '$stateParams', 'PostsService', '$scope'];

function PostsController($http, $state, $stateParams, PostsService, $scope) {

    let vm = this;

    /**
     * We will run this function the first time we load our component.
     *
     * We can use an 'initialize' function to pre-load some data
     * from the database.
     */
    function initialize() {
        console.log('Hello postcont');
        getAllPostsFromDatabase();
    }
    initialize();

    // this function grabs all of the posts from the database
    // via an AJAX call
    function getAllPostsFromDatabase() {
        PostsService.getAllPostsFromDatabase()
            .then(
            function success(response) {
                // if the call is successful, return the list of posts
                vm.postEntries = response.data;
            },
            function failure(response) {
                console.log('Error retrieving Post Entries from database!');
            }
            );
    }

    // This function handles our form submission.
    vm.addPost = function () {

        // the new Post object will be created by binding to the form inputs
        const newPost = {
            amount: vm.newPostAmount,
            note: vm.newPostNote
        };

        // Make an ajax call to save the new Post to the database:
        PostsService.addNewPostToDatabase(newPost)
            .then(
                function success(response) {
                    // only push to the postEntries array if the ajax call is successful
                    const newPostFromDatabase = response.data;
                    vm.postEntries.push(newPostFromDatabase);
                    // then reset the form so we can submit more post
                    resetForm();
                },
                function failure(response) {
                    // if the http call is not successful, log the error
                    // DO NOT clear the form
                    // DO NOT push the new object to the array
                    console.log('Error saving new Post to database!');
                }
            )
    }

    vm.deletePost = function (postIndexToDelete, postIdToDeleteFromDatabase) {

        PostsService.deleteIdFromDatabase(postIdToDeleteFromDatabase)
            .then(
                function success(response) {
                    // only delete the Post from the Angular array if
                    // it was successfully deleted from the database
                    vm.postEntries.splice(postIndexToDelete, 1);
                },
                function failure(response) {
                    // DO NOT delete the Post from the Angular array if the
                    // post is not successfully deleted from the database
                    console.log('Error deleting Post with ID of ' + postIdToDeleteFromDatabase);
                }
            )
    }

    vm.showExpense = function (postId) {
        $state.go('show_post/:postId', { postId: postId });
    }

    // this function can be used to clear the posts form
    function resetForm() {
        vm.newPostAmount = '';
        vm.newPostNote = '';
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
