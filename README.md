# Sandwich-Store

Link: https://gentle-gorge-26123.herokuapp.com/

An app that mimics a point-of-sale kiosk where users can (pretend to) order food.

## Instructions

The main function of this app is to serve as an interface for ordering food. The second function is to allow users to access the database, where users may update the stock if nesseccary.

### Ordering Food

Click the 'Start' button on the home screen to begin.

On the menu page you'll have different sandwiches you can choose from. Click on an item to add it to your order. You can hit the 'Cancel Order' button to exit. If a sandwich is greyed-out, that means there are not enough ingredients in stock to make it.

In order, you first choose your type of sandwich, then customize your order with sauce, cheese, and veggies.

Sauce, cheese, and veggies can be toggled on or off for your sandwich, and you can choose as many different kinds as you want. Ingredients will be greyed-out if there is no stock. Each kind of ingredient has it own page, and on each page you can navigate back and forth. After you pick your veggies your candwich will be added to the order.

Your order will be displayed on the right, along with the total cost. Each item will display the type of sandwich, the ingredients added, and the individual cost. You can remove the item from the order by clicking the red 'x' button next to it.

Once a sandwich is added to the order, you can choose to add another sandwich,or you can chick the 'Submit Order' button to place your order. When you do, you'll be given an order number, and the app will reset after 5 seconds.

### Updating Stock

It's possible for the stock of each ingredient to run out, making it impossible to order anything. In this case the stock needs to be manually updated.

At the start screen, there is a button on the upper right labeled 'Associate login'. To proceed, enter these credentials:

Username: Admin
Password: 1111

This allows access to a page with a table listing the ingredients and their stock. Here you can input the new stock for any ingredient on the rightmost column under 'New Stock'. After doing this for any ingredient and hitting the 'Submit' button, The stock will be updated. You can tell when the Numbers in the 'Current Stock' column change.

When you're done, hit the 'Log Out' button on the top-right to return to the start page.