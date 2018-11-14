const Sandwich = require('../sandwiches');

Sandwich.sync({force: true}).then(() => {
  console.log('Synch successful!')
  return Sandwich.bulkCreate([
    {name: "Roast Beef", price: 5.99},
    {name: "Turkey", price: 5.99},
    {name: "Ham", price: 5.99},
    {name: "Ultimate", price: 5.99},
    {name: "Italian", price: 5.99}
  ]).then( res => {

  })
}).catch( err => {
  console.log(err);
});

console.log("It never ends")