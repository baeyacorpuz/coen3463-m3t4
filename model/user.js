var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');
var router = express.Router();
var restify = require('express-restify-mongoose');

var usersDataSchema = new Schema
(
    {
        username: {type:String, default: ''},
        firstName: {type:String, default: ''},
        lastName: {type:String, default: ''},
        email: {type:String, default: ''},
        website: {type:String, default: ''},
        profileImage: {
            type:String,
            default: ''
        },
        role: {
            type:String,
            enum: ['administrator', 'editor', 'viewer'],
            default: 'viewer'
        }
    },
    {
        collection: 'usersData'
    }
);

usersDataSchema.plugin(passportLocalMongoose);
usersDataSchema.plugin(timestamps);

usersData = mongoose.model('usersData', usersDataSchema);

restify.serve(router, usersData);

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
