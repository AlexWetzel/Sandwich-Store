const express = require("express");
const bodyParser = require("body-parser");
const api = require('./routes/api.js');
const session = require('express-session');
const passport = require('./passport');
const user = require('./routes/user.js')(passport);
const flash = require('connect-flash-plus');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieParser()); ??

// if (process.env.NODE_ENV === "production") {
//   app.use('/static', express.static(path.join(__dirname, 'client/build')));

//   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
//   });
// }



// Passport
// ========================================================
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
// app.use(passport.session());

// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next();
// });

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates

app.use(flash());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build/')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Routes
// ========================================================
app.use('/user', user);
app.use('/api', api);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
});