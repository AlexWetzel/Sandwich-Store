const router = require("express").Router();

router.get("/api/testconnection", (req, res) => {
  res.json("Server connection confirmed")
})

console.log("Routes working");

module.exports = router;