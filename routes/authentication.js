var express = require('express');
var router = express.Router();
const passport= require('passport')

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin',(req, res)=>{
  res.render('auth/signin')
});

router.post('/signin',  (req, res, next)=> {
  passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect:'/signin',
    failureFlash: true
  })(req, res, next)
});

router.get('/profile',(req, res)=>{
  res.render('profile')
})

router.get('/logout',(req, res)=>{
  req.logOut(function(error){
    if(error) return next(error)
  })
  res.redirect('/signin')
})


module.exports = router;