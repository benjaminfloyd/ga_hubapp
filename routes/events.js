var express = require('express');
var router = express.Router();

var Event = require('../models/event');

router.get('/', (request, response) => {

    // Find all of the Events from the database
    Event.find({}).exec(function (error, events) {
        if (error) {
            console.log('Error retrieving events!');
            console.log('Error: ' + error);
            return;
        }

        // if there are no errors, send the events back as JSON    
        console.log(events);
        response.send(events);
    })

})

router.get('/:eventId', function (request, response) {

    const eventIdToShow = request.params.eventId;

    Event.findById(eventdToShow, function (error, foundCredit) {
        if (error) {
            console.log('Error finding Event with ID of ' + eventIdToShow);
            return;
        }

        response.send(foundEvent);
    });

});

router.post('/', (request, response) => {

    // grab the new Event info from the request
    let eventFromRequest = request.body;

    // then build a new Event model with the info
    // REMEMBER: the new Date will be created by the database
    let newEvent = new Event({
        
            event_name: eventFromRequest.event_name,
            event_location: eventFromRequest.event_location,
            event_description: eventFromRequest.event_description,
            event_date: eventFromRequest.event_date,
            event_cost: eventFromRequest.event_cost,
    });
    console.log(newEvent)
        
    // save the new Event model to the database
    newEvent.save(function (error, newEvent) {
        if (error) {
            console.log(error);
            return;
        }

        // once the new event has been saved, return it to the client
        response.send(newEvent);
    });
});

router.patch('/', function (request, response) {

    let eventToUpdate = request.body;

    console.log(eventToUpdate);

    Event.findByIdAndUpdate(eventToUpdate._id, eventToUpdate, { new: true })
        .exec(function (error, updatedEvent) {

            if (error) {
                console.log("Error while updating Event with ID of " + eventToUpdate.id);
                return;
            }

            response.send(200);

        });
});

router.delete('/:eventId', function (request, response) {

    const eventIdToDelete = request.params.eventId;

    Event.findByIdAndRemove(eventIdToDelete).exec(function (error) {
        if (error) {
            console.log("Error while deleting Event with ID of " + eventIdToDelete);
            return;
        }

        // once the event has been deleted, tell the server everything was successful
        response.sendStatus(200);
    })

});



module.exports = router;
