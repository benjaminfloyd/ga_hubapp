var showPostTemplate = require('./show-post.html')
var showPostController = require('./showPost.controller')

const ShowPostComponent = {
    template: showPostTemplate,
    controller: showPostController
}

angular
    .module('GA_HubApp')
    .component('showPost', ShowPostComponent);
