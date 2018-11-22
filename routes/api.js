const router = require("express").Router();
const db = require('../models');

ingredientCount = order => {
  const ingrdtCount = [];

  order.forEach( item => {
    item.ingredients.forEach( ingredient => {
      const counter = ingrdtCount.find(ing => ing.name === ingredient)

      if (counter === undefined) {
        ingrdtCount.push({name: ingredient, count: 1})
      } else {
        counter.count++;
      }
    })
  })
  console.log(ingrdtCount);
  return ingrdtCount
}

router.get("/api/menu", (req, res) => {

  db.Sandwich.belongsToMany( db.Ingredient, {
    as: 'sandwiches',
    through: db.SandwichIngredients,
    foreignKey: 'sandwichId'
  });
  
  db.Ingredient.belongsToMany( db.Sandwich, {
    as: 'meats',
    through: db.SandwichIngredients,
    foreignKey: 'ingredientId'
  });



  Promise.all([
    db.Sandwich.findAll({
      include: [{
        model: db.Ingredient,
        as: 'sandwiches',
        through: {
          attributes: [],
        }
      }]
    }),
    db.Ingredient.findAll({})
  ]).then( data => {
    // console.log();

    const sandwiches = data[0].map( sandwich => {
      let sandwichData = sandwich.dataValues;
      return {type: sandwichData.name, price: parseFloat(sandwichData.price)};
    })
    const ingredients = data[1].map( ingredient => {
      let ingredientData = ingredient.dataValues;
      return {name: ingredientData.name, type: ingredientData.type, stock: ingredientData.stock};
    })

    res.json(data);

    // res.json({
    //   sandwiches: sandwiches,
    //   ingredients: ingredients
    // });
  })
})

router.post("/api/order", (req, res) => {
  res.send();

  const order = req.body;

  const count = ingredientCount(order);

  console.log(count);

  db.Ingredient.findAll({})
  .then( (data) => {
    let newData = data

    count.forEach(ingredient => {

      let newEntry = newData.find( entry => entry.name === ingredient.name);
      newEntry.stock -= ingredient.count;
      console.log(newEntry.dataValues);

      db.Ingredient.update(
        {stock: newEntry.stock},
        {where: {name: newEntry.name}}
      ).then(() => console.log('success'))
      .catch( err => console.log(err))

    })
  }).then( () => {
  }).catch( err => console.log(err));
})

console.log("Routes working");

module.exports = router;