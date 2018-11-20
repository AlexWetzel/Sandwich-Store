const router = require("express").Router();
const db = require('../models');

ingredientCount = order => {
  let ingrdtCount = [];

  order.forEach( item => {
    item.ingredients.forEach( ingredient => {
      let counter = ingrdtCount.find(ing => ing.name === ingredient.name)

      if (counter === undefined) {
        ingrdtCount.push({name: ingredient.name, count: 1})
        console.log(ingrdtCount)
      } else {
        counter.count++;
        console.log(counter);
      }
    })
  })
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
  console.log(req.body[0].ingredients);

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