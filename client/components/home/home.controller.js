console.log("Home controller working")

HomeController.$inject = ['$http', '$state', 'EventsService','PostsService'];

function HomeController($http, $state, EventsService, PostsService) {
	const vm = this;

	function initialize() {

        console.log('Events Controller Working');
        getAllEventsFromDatabase();
		getAllPostsFromDatabase();
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
}

module.exports = HomeController;