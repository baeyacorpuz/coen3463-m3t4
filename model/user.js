var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

var user = new Schema
(
    {
        firstName: {type:String, default: ''},
        lastName: {type:String, default: ''}
        
    },
    {
        collection: 'usersData'
    }
);

user.plugin(passportLocalMongoose);
user.plugin(timestamps);

module.exports = mongoose.model('user', user);