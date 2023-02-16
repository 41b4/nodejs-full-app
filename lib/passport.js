const passport=require('passport')
const localStrategy= require('passport-local').Strategy

const pool = require('../database')

const helpers = require('../lib/helpers')

passport.use('local.signup', new localStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
},async (req, username, password, done)=>{
    const {email, fullname} = req.body
    const newUser = {
        username,
        password,
        email,
        fullname
    }
    console.log(newUser)
    newUser.password= await helpers.encryptPassword(password)

    const result= await pool.query('INSERT INTO users SET ?',[newUser])

    return done(null, newUser)
}))