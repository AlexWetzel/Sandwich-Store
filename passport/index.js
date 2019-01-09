const passport = require('passport');
// const LocalStrategy = require('./login');
const login = require('./login');
const signup = require('./signup');
const db = require('../models');

// Passport needs to be able to serialize and deserialize users to support persistent login sessions
passport.serializeUser(function(user, done) {
  console.log('serializing user: ');console.log(user.username);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // db.User.findById(id, function(err, user) {
  //     console.log('deserializing user:',user);
  //     done(err, user);
  // }); 
  db.User.findById(id).then(function(user) {
    // console.log('deserializing user:',user);
    // console.log("ID: ", user.dataValues)
    done(null, user.get());
  }).catch(function(err) {
    console.log(err);
  });
});

passport.use('login', login);
// passport.use(signup);

// Setting up Passport Strategies for Login and SignUp/Registration
// login(passport);
// signup(passport);

module.exports = passport;