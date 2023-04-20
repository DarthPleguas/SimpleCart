var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        User
        .findOne({username: username})
        .then(function(user) {
    
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
  
      
        if (bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
     
    
    })}
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id,user, done) => {
      User.findById(id) 
        return done(null, user)
    });
      
    
  }
  
  module.exports = initialize
  

