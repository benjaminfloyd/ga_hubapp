let postsTemplate = require(__dirname + '/posts.html');
let postsController = require(__dirname + '/posts.controller.js');

let PostsComponent = {
    template: postsTemplate,
    controller: postsController
}

angular.module('HubApp').component('posts', PostsComponent);
