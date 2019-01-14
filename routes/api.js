const router = require("express").Router();
const db = require('../models');

// TODO: consider putting this in a helper file?
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

router.get("/menu", (req, res) => {

  Promise.all([
    db.Sandwich.findAll({
      attributes: ['id', 'name', 'price'],
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
        return {name: meat.name, quantity: meat.SandwichIngredient.quantity}
      });
      
      return {id: sandwich.id, type: sandwich.name, price: parseFloat(sandwich.price), meat: meats};
    });
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
router.post("/order", (req, res) => {

  let orderNumber = 000001;
  const order = req.body;
  const count = ingredientCount(order);

  console.log(count);

  db.Order.max('orderNumber').then( data => {
    if(!isNaN(data)){
      orderNumber = data + 1;
    }
    console.log('Order Number:', orderNumber);

    const orderLog = order.map( sandwich => {
       return {orderNumber: orderNumber, sandwichId: sandwich.id};
    })

    db.Order.bulkCreate(orderLog)
    .then( data => {
      console.log('Order logged:', data.dataValues);
    }).catch(err=>{console.log(err)});

  }).catch(err=>{console.log(err)});

  // Query the ingredient table to get the stock
  db.Ingredient.findAll({})
  .then( (data) => {
    // Subtract ingredients in the order from the stock
    count.forEach(ingredient => {

      let newEntry = data.find( entry => entry.name === ingredient.name);
      newEntry.stock -= ingredient.count;
      console.log(newEntry.dataValues);

      // Update ingredient table
      db.Ingredient.update(
        {stock: newEntry.stock},
        {where: {name: newEntry.name}}
      ).then(() => {
        
      })
      .catch( err => console.log(err));

    })
  }).then( () => {
    res.status(200).send({message: "Data Update Successful!", orderNumber: orderNumber});
  }).catch( err => console.log(err));
});

router.post("/inventory", (req, res) => {
  const newInventory = req.body.inventory;

  // Query the ingredient table to get the stock
  db.Ingredient.findAll({})
  .then( (data) => {
    // let newData = data

    newInventory.forEach(ingredient => {
      const name = ingredient.name;
      const newStock = ingredient.newStock;
      const stock = ingredient.stock;
      // Update ingredient table
      if ( stock !== newStock ) { 
        db.Ingredient.update(
          {stock: newStock},
          {where: {name: name}}
        ).then(() => {
         
        })
        .catch( err => console.log(err));
      }

    })
  }).then(() => {
    res.status(200).send({message: "Data Update Successful!"});
  }).catch( err => console.log(err));
});

module.exports = router;