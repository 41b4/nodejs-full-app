var express = require('express');
var router = express.Router();
const passport= require('passport')
const {isLoggedIn, isNotLogged}= require('../lib/auth')

/* GET users listing. */
router.get('/signup',isNotLogged, function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup',isNotLogged, passport.authenticate('local.signup',{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin',isNotLogged,(req, res)=>{
  res.render('auth/signin')
});

router.post('/signin',isNotLogged,  (req, res, next)=> {
  passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash: true
  })(req, res, next)
});

router.get('/profile',isLoggedIn,(req, res)=>{
  res.render('profile')
})

router.get('/logout', isLoggedIn,(req, res)=>{
  req.logOut(function(error){
    if(error) return next(error)
  })
  res.redirect('/signin')
})


module.exports = router;