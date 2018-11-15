const router = require("express").Router();
const db = require('../models');

router.get("/api/testconnection", (req, res) => {
  Promise.all([
    db.Sandwich.findAll({}),
    db.Ingredient.findAll({})
  ]).then( data => {
    // console.log(data[0][0].dataValues);

    const sandwiches = data[0].map( sandwich => {
      let sandwichData = sandwich.dataValues;
      return {type: sandwichData.name, price: sandwichData.price};
    })
    const ingredients = data[1].map( ingredient => {
      let ingredientData = ingredient.dataValues;
      return {name: ingredientData.name, type: ingredientData.type};
    })

    res.json({
      sandwiches: sandwiches,
      ingredients: ingredients
    });
  })

})

console.log("Routes working");

module.exports = router;