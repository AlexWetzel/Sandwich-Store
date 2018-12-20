const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api.js');
const session = require('express-session');
const passport = require('passport');
const user = require('./routes/user.js')(passport);
const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieParser()); ??

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Passport
// ========================================================
//This key has something to do with the user session
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
const flash = require('connect-flash-plus');
app.use(flash());

// Initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

// Routes
// ========================================================
app.use('/user', user);
app.use('/api', api);

// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

//Features
//User login with PIN code
//Admin Access for backend features
//Add user, assign powers, order stock, update stock
//populate front end with back end stock
//Grey-out out-of-stock ingredients
//orders will update stock
//Logs?