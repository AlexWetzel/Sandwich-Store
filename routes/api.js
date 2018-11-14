const router = require("express").Router();
const db = require('../models');

router.get("/api/testconnection", (req, res) => {
  res.json("Server connection confirmed")
})

console.log("Routes working");

module.exports = router;