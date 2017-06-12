let postsTemplate = require(__dirname + '/posts.html');
let postsController = require(__dirname + '/posts.controller.js');

let PostsComponent = {
    template: postsTemplate,
    controller: postsController
}

angular.module('GA_HubApp').component('posts', PostsComponent);
