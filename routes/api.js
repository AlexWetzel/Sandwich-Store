const router = require("express").Router();
const db = require('../models');

router.get("/api/testconnection", (req, res) => {

  db.Sandwich.findAll({}).then( sandwiches => {
    res.json( sandwiches );
  })
})

console.log("Routes working");

module.exports = router;