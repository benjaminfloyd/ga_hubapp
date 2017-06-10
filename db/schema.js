var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

// var EventSchema = new Schema({
//     amount: { type: Number, required: true },
//     note: { type: String, required: true },
//     createdAt: Date,
//     updatedAt: Date
// })

// EventSchema.pre('save', function(next) {
//     now = new Date();
//     this.updatedAt = now;

//     if( !this.createdAt ) {
//         this.createdAt = now;
//     }
//     next();
// })

var PostSchema = new Post({
    company_name: String,
    position_title: String, job_description: String,
    date_available: Date,
    date_posted: Date
})

PostSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;

    if( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
})

var EventModel = mongoose.model("Event", EventSchema);

var PostModel = mongoose.model("Post",PostSchema);

module.exports = {
  Event: EventModel,
 Post:PostModel
};