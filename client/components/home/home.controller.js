console.log("Home controller working")

HomeController.$inject = [$http, $state];

function HomeController($http, $state) {
	const vm = this;
}

module.exports = HomeController;