const router = require("express").Router();
const db = require('../models');

  //TODO: Move associations somewhere else?
  db.Sandwich.belongsToMany( db.Ingredient, {
    as: 'meats',
    through: db.SandwichIngredients,
    foreignKey: 'sandwichId'
  })
  
  db.Ingredient.belongsToMany( db.Sandwich, {
    as: 'sandwiches',
    through: db.SandwichIngredients,
    foreignKey: 'ingredientId'
  });

  // Some test code
  // db.Sandwich.find({
  //   where: {
  //     name: 'italian'
  //   },
  //   attributes: ['name', 'price'],
  //   include: [{
  //     model: db.Ingredient,
  //     as: 'meats',
  //     through: {
  //       attributes: ['quantity'],
  //     }
  //   }]
  // }).then( res => {
  //   console.log(res.meats[0].sandwichIngredient)
  // })

//TODO: consider putting this in a helper file
ingredientCount = order => {
  const ingrdtCount = [];  

  order.forEach( item => {
    item.meat.forEach( meat => {
      const counter = ingrdtCount.find(ing => ing.name === meat.name);
      if (counter === undefined) {
        ingrdtCount.push({name: meat.name, count: meat.quantity})
      } else {
        counter.count += meat.quantity;
      }
    });
    item.ingredients.forEach( ingredient => {
      const counter = ingrdtCount.find(ing => ing.name === ingredient)

      if (counter === undefined) {
        ingrdtCount.push({name: ingredient, count: 1})
      } else {
        counter.count++;
      }
    });
  });
  console.log(ingrdtCount);
  return ingrdtCount;
}

router.get("/api/menu", (req, res) => {

  Promise.all([
    db.Sandwich.findAll({
      attributes: ['name', 'price'],
      include: [{
        model: db.Ingredient,
        as: 'meats',
        attributes: ['name'],
        through: {
          attributes: ['quantity']
        }
      }]
    }),
    db.Ingredient.findAll({
      attributes: ['name', 'type', 'stock']
    })
  ]).then( data => {

    const sandwiches = data[0].map( sandwich => {      
      const meats = sandwich.meats.map( meat => {
        return {name: meat.name, quantity: meat.sandwichIngredient.quantity}
      })
      
      return {type: sandwich.name, price: parseFloat(sandwich.price), meat: meats};
    })
    const ingredients = data[1]

    res.json({
      sandwiches: sandwiches,
      ingredients: ingredients
    });
  })
})

// The order is sent to this route to update the stock of the ingredients
// The logic assumes only one user at a time, as multiple users at a time may cause errors with stock calculation.
// TODO: Add a method that checks the database before attempting to write
router.post("/api/order", (req, res) => {
  res.send();

  const order = req.body;

  const count = ingredientCount(order);

  console.log(count);

  // Query the ingredient table to get the stock
  db.Ingredient.findAll({})
  .then( (data) => {
    let newData = data

    // Subtract ingredients in the order from the stock
    count.forEach(ingredient => {

      let newEntry = newData.find( entry => entry.name === ingredient.name);
      newEntry.stock -= ingredient.count;
      console.log(newEntry.dataValues);

      // Update ingredient table
      db.Ingredient.update(
        {stock: newEntry.stock},
        {where: {name: newEntry.name}}
      ).then(() => console.log('success'))
      .catch( err => console.log(err))

    })
  }).then( () => {
  }).catch( err => console.log(err));
})

module.exports = router;