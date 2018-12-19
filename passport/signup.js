var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {

      console.log("Attempting to sign up.")

      findOrCreateUser = function () {
        console.log(req.body)
        // find a user in Mongo with provided username

        db.Users.count({
          where: {
            name: username
          }
        }).then(count => {
          if (count != 0) {
            console.log('User already exists with username: ' + username);
            return done(null, false, req.flash('message', 'User Already Exists'));
          }

          if (req.session.userID != undefined) {
            db.Users.findAll({
              where: {
                id: req.session.userID
              }
            }).then((row) => {
              row[0].update({
                name: username,
                password: createHash(password)
              }).then( (user) => {
                console.log('User Registration succesful');
                console.log("this is the user id: " + req.session.userID);
                console.log("this is the passport user id: " + user.id);
                
                return done(null, user);
              })
            })
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
