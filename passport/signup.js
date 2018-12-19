var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var bCrypt = require('bcrypt-nodejs');

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
        // find a user in the database with provided username

        // db.Users.count({
        //   where: {
        //     username: username
        //   }
        // }).then(count => {
        //   if (count != 0) {
        //     console.log('User already exists with username: ' + username);
        //     return done(null, false, req.flash('message', 'User Already Exists'));
        //   }

        //   if (req.session.userID != undefined) {
        //     db.User.findAll({
        //       where: {
        //         id: req.session.userID
        //       }
        //     }).then((row) => {
        //       row[0].update({
        //         username: username,
        //         firstname: firstname,
        //         lastname: lastname,
        //         password: createHash(password)
        //       }).then( (user) => {
        //         console.log('User Registration succesful');
        //         console.log("this is the user id: " + req.session.userID);
        //         console.log("this is the passport user id: " + user.id);
                
        //         return done(null, user);
        //       })
        //     })
        //   }
        // }).catch((err) => {
        //   // In case of any error, return using the done method
        //   console.log('Error: ' + err);
        //   return done(err);
        // });


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
