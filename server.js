const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./routes/api.js');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Features
//User login with PIN code
//Admin Access for backend features
//Add user, assign powers, order stock, update stock
//populate front end with back end stock
//Grey-out out-of-stock ingredients
//orders will update stock
//Logs?

app.use("", routes);

// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})