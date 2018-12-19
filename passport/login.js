const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
    },
    function(req, username, password, done) { 
        // check in the Users table if a user with username exists or not
        db.User.findOne({ where: {username: username} }).then(function(user) {
            console.log("user found: ", user);
            // Username does not exist, log the error and redirect back
            if (!user){
                console.log('User Not Found with username '+username);
                return done(null, false, req.flash('message', 'User Not found.'));                 
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)){
                console.log('Invalid Password');
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);
        })
        .catch(function(err) {
            // If error, return using the done method
            return done(err);
        });
    }));

    const isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}