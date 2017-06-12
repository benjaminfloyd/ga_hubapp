const createPostTemplate = require('./create-post.html')
const createPostController = require('./createPost.controller')

const CreatePostComponent = {
    template: createPostTemplate,
    controller: createPostController
}

angular
    .module('HubApp')
    .component('createPost', CreatePostComponent);
