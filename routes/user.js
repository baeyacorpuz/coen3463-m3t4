var express = require('express');
var router = express.Router();
var moment = require('moment');

var defaultProfileImage = '';
var profileImage;
var defaultRole  = 'viewer';
var role;

router.get('/', function(req, res, next) {
    if(req.user){
        usersData.find()
            .then(function (usersData) {
                res.render('users', {
                    user: req.user,
                    title: 'Users | Hotlines',
                    navBarTitle: 'Users',
                    usersData: usersData,
                    moment: moment,
                    alertMessage: req.flash('alertMessage')
                });
            });
    }
    else{
        res.redirect('/');
    }
});

router.get('/add', function(req, res, next) {
    if(req.user.role === 'administrator'){
        res.render('users-add', {
            user: req.user,
            title: 'Add New User | Hotlines',
            navBarTitle: 'Add New User'
        });
    }
    else{
        res.redirect('/');
    }
});

router.post('/add', function(req, res, next) {
    if(req.user.role === 'administrator'){
        if (req.body.profileImage.length == 0) {
            profileImage = defaultProfileImage;
        }
        else if (req.body.profileImage.length > 0){
            profileImage = req.body.profileImage;
        }
        if (req.body.role.length == 0) {
            role = defaultRole;
        }
        else if (req.body.role.length > 0){
            role = req.body.role;
        }
        var user = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            website: req.body.website,
            profileImage: profileImage,
            role: role
        };
        usersData.register(new usersData(user), req.body.confirmPassword, function(err) {
            if(!err){
                req.flash('alertMessage', 'New User Added!');
                res.redirect('/users');
            }
            else
            {
                res.render('users-add', {
                    user: req.user,
                    title: 'Add New User | Hotlines',
                    navBarTitle: 'Add New User',
                    alertMessage: 'Sorry! User not registered because the username already exists. Please try again',
                    postError: true
                });
            }
        });
    }
});

router.get('/:username', function(req, res, next) {
    if(req.user){
        var username = req.params.username;
        usersData.findOne({username: username}, function (err, userData) {
            if (!err) {
                res.render('users-profile', {
                    user: req.user,
                    title: 'User Profile | Hotlines',
                    navBarTitle: 'User Profile',
                    userData: userData,
                    moment: moment
                });
            }
            else {
                res.end(err);
            }
        });
    }
    else{
        res.redirect('/');
    }
});

router.get('/:username/edit', function(req, res, next) {
    if(req.user){
        var username = req.params.username;
        usersData.findOne({username: username}, function (err, userData) {
            if (!err) {
                if(req.user.role === 'administrator'){
                    res.render('users-edit', {
                        user: req.user,
                        title: 'Update User | Hotlines',
                        navBarTitle: 'Update User',
                        userData: userData,
                        moment: moment
                    });
                }
                else if(req.user.role === 'editor' || req.user.role === 'viewer'){
                    if (req.user.username == username){
                        res.render('users-edit', {
                            user: req.user,
                            title: 'Update Profile | Hotlines',
                            navBarTitle: 'Update Profile',
                            userData: userData,
                            moment: moment
                        });
                    }
                    else{
                        res.redirect('/');
                    }
                }
            }
            else {
                res.end(err);
            }
        });
    }
    else{
        res.redirect('/');
    }
});

router.post('/:username/edit', function(req, res, next) {
    if(req.user){
        var username = req.params.username;

        if (req.body.profileImage.length == 0) {
            profileImage = defaultProfileImage;
        }
        else{
            profileImage = req.body.profileImage;
        }

        usersData.findOne({username: username}, function(err, userData) {
            if(!err){
                userData.username = req.body.username;
                userData.firstName = req.body.firstName;
                userData.lastName = req.body.lastName;
                userData.email= req.body.email;
                userData.website = req.body.website;
                userData.profileImage = profileImage;
                userData.role = req.body.role;
                if(req.body.password.length > 0){
                    userData.setPassword(req.body.password, function(){
                        userData.save();
                    });
                }
                userData.save(function(err, userData){
                    if(!err){
                        if(req.user.role === 'administrator'){
                            res.render('users-edit', {
                                user: req.user,
                                title: 'Edit User | Hotlines',
                                navBarTitle: 'Update User',
                                alertMessage: 'User Updated',
                                postError: false,
                                userData: userData,
                                moment: moment
                            });
                        }
                        else if(req.user.role === 'editor' || req.user.role === 'viewer') {
                            if (req.user.username == username) {
                                res.render('users-edit', {
                                    user: req.user,
                                    title: 'Update Profile | Hotlines',
                                    navBarTitle: 'Update Profile',
                                    alertMessage: 'Profile Updated',
                                    postError: false,
                                    userData: userData,
                                    moment: moment
                                });
                            }
                            else{
                                res.redirect('/');
                            }
                        }
                    }
                    else{
                        if(req.user.role === 'administrator'){
                            res.render('users-edit', {
                                user: req.user,
                                title: 'Edit User | Hotlines',
                                navBarTitle: 'Update User',
                                alertMessage: 'User Not Updated! Please Try Again',
                                postError: true,
                                userData: userData,
                                moment: moment
                            });
                        }
                        else if(req.user.role === 'editor' || req.user.role === 'viewer') {
                            if (req.user.username == username) {
                                res.render('users-edit', {
                                    user: req.user,
                                    title: 'Update Profile | Hotlines',
                                    navBarTitle: 'Update Profile',
                                    alertMessage: 'Profile Not Updated! Please Try Again',
                                    postError: true,
                                    userData: userData,
                                    moment: moment
                                });
                            }
                            else{
                                res.redirect('/');
                            }
                        }
                    }
                });
            }
            else {
                res.end(err);
            }
        });
    }
    else{
        res.redirect('/');
    }
});

router.post('/:username/delete', function(req, res, next) {
    if(req.user){
        var username = req.params.username;
        if (req.user.role === 'administrator'){
            usersData.remove({username: username}, function(err){
                if(!err){
                    req.flash('alertMessage', 'User Deleted!');
                    res.redirect('/users');
                }
                else {
                    res.end(err);
                }
            });
        }
        else if(req.user.role === 'editor' || req.user.role === 'viewer') {
            if (req.user.username == username) {
                usersData.remove({username: username}, function(err){
                    if(!err){
                        req.flash('alertMessage', 'Account Deleted!');
                        res.redirect('/');
                    }
                    else {
                        res.end(err);
                    }
                });
            }
        }
    }
    else{
        res.redirect('/');
    }
});

module.exports = router;
