const SandwichIngredients = require('../SandwichIngredients');

SandwichIngredients.sync({force: true}).then(() => {
  console.log('Synch successful!')
  return SandwichIngredients.bulkCreate([
    {sandwichId: 1, ingredientId: 3, quantity: 2},
    {sandwichId: 2, ingredientId: 2, quantity: 2},
    {sandwichId: 3, ingredientId: 1, quantity: 2},
    {sandwichId: 4, ingredientId: 1, quantity: 1},
    {sandwichId: 4, ingredientId: 2, quantity: 1},
    {sandwichId: 4, ingredientId: 3, quantity: 1},
    {sandwichId: 5, ingredientId: 1, quantity: 1},
    {sandwichId: 5, ingredientId: 4, quantity: 1}
  ]).then( res => {
    console.log('Join table seeded')
  })
}).catch( err => {
  console.log(err);
});