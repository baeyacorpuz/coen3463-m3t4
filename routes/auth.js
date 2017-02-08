var passport = require('passport');
var User = require('../model/user');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/add', function(req, res, next) {
    var add = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    };
    User.register(new User(add), req.body.password, function(err, account) {
      if(err) {
        return res.render('index', {account: account});
      }

      req.login(account, function(err) {
        res.redirect('/user');
      });
    })
  })

router.get('/login', function(req, res, next) {
  res.render('/', {user: req.user});
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/user');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;