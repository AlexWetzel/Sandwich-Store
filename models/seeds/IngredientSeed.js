const Ingredient = require('../ingredients');

Ingredient.sync({force: true}).then( () => {
  console.log('Synch successful!')
  return Ingredient.bulkCreate([
    {name: 'Ham', type: 'meat', stock: 200},
    {name: 'Turkey', type: 'meat', stock: 200},
    {name: 'Roast Beef', type: 'meat', stock: 200},
    {name: 'Salami', type: 'meat', stock: 100},
    {name: 'Mayonnaise', type: 'sauce', stock: 100},
    {name: 'Yellow Mustard', type: 'sauce', stock: 100},
    {name: 'Honey Mustard', type: 'sauce', stock: 100},
    {name: 'Dijon Mustard', type: 'sauce', stock: 100},
    {name: 'Horseradish Mayo', type: 'sauce', stock: 100},
    {name: 'Cheddar', type: 'cheese', stock: 100},
    {name: 'Swiss', type: 'cheese', stock: 100},
    {name: 'Provolone', type: 'cheese', stock: 100},
    {name: 'Lettuce', type: 'veggies', stock: 100},
    {name: 'Tomato', type: 'veggies', stock: 100},
    {name: 'Red Onion', type: 'veggies', stock: 100},
    {name: 'Pickles', type: 'veggies', stock: 100},
    {name: 'Olives', type: 'veggies', stock: 100},
    {name: 'Banana Peppers', type: 'veggies', stock: 100},
    {name: 'Jalapenos', type: 'veggies', stock: 100}
  ]).catch( err => {
    console.log(err);
  });
}).catch( err => {
  console.log(err);
});