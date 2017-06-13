var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', (request, response) => {

    User.find({}).exec(function (error, users) {
        if (error) {
            console.log('Error retrieving users!');
            console.log('Error: ' + error);
            return;
        }

        console.log(users);
        response.send(users);
    })

})

router.get('/:userId', function (request, response) {

    const userIdToShow = request.params.userId;

    User.findById(userdToShow, function (error, foundUser) {
        if (error) {
            console.log('Error finding User with ID of ' + userIdToShow);
            return;
        }

        response.send(foundUser);
    });

});

router.post('/', (request, response) => {

    let userFromRequest = request.body;
        console.log(userFromRequest);
    let newUser = new User({

            first_name: userFromRequest.first_name,
            last_name: userFromRequest.last_name,
            email: userFromRequest.email,
            title: userFromRequest.title,
    });
    console.log(newUser)

    newUser.save(function (error, savedUser) {
        if (error) {
            console.log(error);
            return;
        }

        response.send(savedUser);
    });
});

router.patch('/', function (request, response) {

    let userToUpdate = request.body;

    console.log(userToUpdate);

    User.findByIdAndUpdate(userToUpdate._id, userToUpdate, { new: true })
        .exec(function (error, updatedUser) {

            if (error) {
                console.log("Error while updating User with ID of " + userToUpdate.id);
                return;
            }

            response.send(200);

        });
});

router.delete('/:userId', function (request, response) {

    const userIdToDelete = request.params.userId;

    User.findByIdAndRemove(userIdToDelete).exec(function (error) {
        if (error) {
            console.log("Error while deleting User with ID of " + userIdToDelete);
            return;
        }

        response.sendStatus(200);
    })

});



module.exports = router;
