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
}

router.get("/api/menu", (req, res) => {
  Promise.all([
    db.Sandwich.findAll({}),
    db.Ingredient.findAll({})
  ]).then( data => {
    // console.log(data[0][0].dataValues);

    const sandwiches = data[0].map( sandwich => {
      let sandwichData = sandwich.dataValues;
      return {type: sandwichData.name, price: parseFloat(sandwichData.price)};
    })
    const ingredients = data[1].map( ingredient => {
      let ingredientData = ingredient.dataValues;
      return {name: ingredientData.name, type: ingredientData.type, stock: ingredientData.stock};
    })

    res.json({
      sandwiches: sandwiches,
      ingredients: ingredients
    });
  })
})

router.post("/api/order", (req, res) => {
  res.send();

  console.log(req.body);

  const order = req.body;

  ingredientCount(order);



  // order.ingredients.forEach( ingredient => {
    
  // });

  // db.Ingredient.findAll({})
  // .then( (data) => {
  //   let newData = data
  //   console.log(newData)
  // })
  // db.Ingredient.update(
  //   {stock: 200},
  //   {where: {name: 'Lettuce'}}
  // ).then( newValue => {
  //   console.log(newValue);
  // }).catch( err => {
  //   console.log(err);
  // })
})

console.log("Routes working");

module.exports = router;