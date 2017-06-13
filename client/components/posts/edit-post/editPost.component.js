const editPostTemplate = require('./edit-post.html')
const editPostController = require('./editPost.controller')

const EditPostComponent = {
    template: editPostTemplate,
    controller: editPostController
}

angular
    .module('HubApp')
    .component('editPost', EditPostComponent);
