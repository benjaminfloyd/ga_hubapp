var showPostTemplate = require('./show-post.html');
var showPostController = require('./showPost.controller');

const ShowPostComponent = {
    template: showPostTemplate,
    controller: showPostController
}

angular
    .module('HubApp')
    .component('showPost', ShowPostComponent);
