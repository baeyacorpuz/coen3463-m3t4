var passport = require('passport');
var User = require('../model/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/add', function(req, res, next) {
    var add = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    User.register(new User(add), req.body.password, function(err, account) {
      if(err) {
        return res.render('/newuser', {account: account});
      }
      else {
      	res.redirect('/home');
      }
    })
  })

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/home');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;