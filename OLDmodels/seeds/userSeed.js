const User = require('../users');

db.User.sync({force: true}).then(() => {
  console.log('Synch successful!')
}).catch( err => {
  console.log(err);
});