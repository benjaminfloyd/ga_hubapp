const createPostTemplate = require('./create-post.html')
const createPostController = require('./createPost.controller')

const CreatePostComponent = {
    template: createPostTemplate,
    controller: createPostController
}

angular
    .module('GA_HubApp')
    .component('createPost', CreatePostComponent);
