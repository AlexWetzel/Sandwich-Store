const router = require("express").Router();
const db = require('../models');

module.exports = (passport) => {

  router.post('/signup', passport.authenticate('signup', { session: false }),
    (req, res) => {
      res.json('user created');
    });

  return router;
}
