var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', (request, response) => {

    // Find all of the Posts from the database
    Post.find({}).exec(function (error, posts) {
        if (error) {
            console.log('Error retrieving posts!');
            console.log('Error: ' + error);
            return;
        }

        // if there are no errors, send the posts back as JSON    
        console.log(posts);
        response.send(posts);
    })

})

router.get('/:postId', function (request, response) {

    const postIdToShow = request.params.postId;

    Post.findById(postIdToShow, function (error, foundPost) {
        if (error) {
            console.log('Error finding Post with ID of ' + postIdToShow);
            return;
        }

        response.send(foundPost);
    });

});

router.post('/', (request, response) => {
    console.log('+++++++++++++++++++++++++++router post test');

    // grab the new Post info from the request
    let postFromRequest = request.body;

    // then build a new Post model with the info
    // REMEMBER: the new Date will be created by the database
    let newPost = new Post({
        company_name: postFromRequest.company_name,
        position_title: postFromRequest.position_title,
        job_description: postFromRequest.job_description,
        date_available: postFromRequest.date_available

    });

    // save the new Expense model to the database
    newPost.save(function (error, newPost) {
        if (error) {
            console.log(error);
            return;
        }

        // once the new expense has been saved, return it to the client
        response.send(newPost);
    });
});

router.patch('/', function (request, response) {

    let postToUpdate = request.body;

    console.log(postToUpdate);

    Post.findByIdAndUpdate(postToUpdate._id, postToUpdate, { new: true })
        .exec(function (error, updatedPost) {

            if (error) {
                console.log("Error while updating Post with ID of " + postToUpdate.id);
                return;
            }

            response.send(200);

        });
});

router.delete('/:postId', function (request, response) {

    const postIdToDelete = request.params.postId;

    Post.findByIdAndRemove(postIdToDelete).exec(function (error) {
        if (error) {
            console.log("Error while deleting Post with ID of " + postIdToDelete);
            return;
        }

        // once the expense has been deleted, tell the server everything was successful
        response.sendStatus(200);
    })

});



module.exports = router;
