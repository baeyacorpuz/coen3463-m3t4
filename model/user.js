var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var timestamps = require('mongoose-timestamp');

var usersDataSchema = new Schema
(
    {
        firstName: {type:String, default: ''},
        lastName: {type:String, default: ''},
        email: {type:String, default: ''},
        website: {type:String, default: ''},
        profileImage: {
            type:String,
            default: 'https://raw.githubusercontent.com/jovanidash21/coen3463-m3t6/master/public/images/profile_images/default.png'
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