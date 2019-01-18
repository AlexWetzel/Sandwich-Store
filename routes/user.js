const router = require("express").Router();
const db = require('../models');

module.exports = (passport) => {
  
  router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
  });

  router.post('/signup', passport.authenticate('signup', { session: true }),
    (req, res) => {
      res.json('user created');
    });
  
  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        res.send({ userInfo: null, message: err});
      }
      if (info !== undefined){
        console.log(info.message);
        res.send({ userInfo: null, message: info.message});
      } else {
        console.log('logged in');
        const userInfo = {
          username: user.username
        };
        res.send({ userInfo: userInfo, message: null });
      }
    })(req, res, next);
  });

  router.post('/logout', (req, res) => {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  });
  
  return router;
}
