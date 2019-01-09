const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {
      console.log(username);
      console.log(password);

      console.log("Attempting to sign up.")

      findOrCreateUser = function () {
        console.log(req.body)
        const r = req.body;

        db.User.findOrCreate({
          where: {
            username: username
          },
          defaults: {
            firstName: r.firstname,
            lastName: r.lastname,
            pin: createHash(password)
          }
        }).spread( (user, created) => {
          console.log(user.get({
            plain: true
          }))
          console.log(created)
          if(created){
            console.log('User created');
            return done(null, user);
          } else {
            console.log('User not created');
            return done(null, false, req.flash('message', 'User Already Exists'));
          }
        }).catch((err) => {
          // In case of any error, return using the done method
          console.log('Error: ' + err);
          return done(err);
        });

      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

}
