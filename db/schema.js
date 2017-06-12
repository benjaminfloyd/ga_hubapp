var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var EventSchema = new Schema({
    event_name: String,
    event_location: String,
    event_description: String,
    event_date: Number,
    event_cost: Number,
    updatedAt: Date,
    createdAt: Date

})

EventSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;

    if( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
})

var PostSchema = new Schema ({
    company_name: String,
    position_title: String,
    job_description: String,
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

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    title: String
})

UserSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;

    if( !this.createdAt ) {
        this.createdAt = now;
    }
    next();
})

var EventModel = mongoose.model("Event", EventSchema);

var PostModel = mongoose.model("Post",PostSchema);

var UserModel = mongoose.model("User", UserSchema);

module.exports = {
  Event: EventModel,
  Post: PostModel,
  User: PostModel
 
};