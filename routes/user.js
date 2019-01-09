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
  })

  router.post('/signup', passport.authenticate('signup', { session: false }),
    (req, res) => {
      res.json('user created');
    });
  
  router.post('/login', passport.authenticate('login', {
      // successRedirect: '/',
      // failureRedirect: '/',
      failureFlash: true,
  }),
  (req, res) => {
    console.log('logged in');
    const userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
  );
  return router;
}
