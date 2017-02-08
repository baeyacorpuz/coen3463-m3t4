var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

var user = new Schema
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

user.plugin(passportLocalMongoose);
user.plugin(timestamps);

module.exports = mongoose.model('user', user);