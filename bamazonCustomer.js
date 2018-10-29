/*Bamazon Customer checks the bamazon inventory db, gets
the appropriate product and checks the customer out.*/

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "blackwalnuts",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  getProducts();
});

//shows products from database
function getProducts () {
  console.log('Welcome to Bamazon!');
  connection.query(
    'SELECT * FROM products',
    function(err, res) {
      if (err) throw err;
      console.log('Products Available:');
      for (i in res) {
        console.log('ID: ' + res[i].id);
        console.log('Product: ' + res[i].product_name);
        console.log('Price: $' + res[i].price + '\n');
      }
      start();
    }
  )
}

//asks user to select a product
function start () {
  inquirer.prompt([
    {
      name: "product",
      message: 'What would you like to buy? Product ID:',
      validate: function (input) {
          if(Number.isNaN(parseInt(input))) {
            return 'Please select a product ID number.';
          } else {
            return true;
          }
          
      }
    },
    {
      name: "quant",
      message: 'How many would you like to buy?',
      validate: function (input) {
          if(Number.isNaN(parseInt(input))) {
            return 'Please select a number.';
          } else {
            return true;
          }
          
      }
    }]
  //User has selected a product to buy
  ).then(function(res) {
    checkStock(parseInt(res.product), parseInt(res.quant));
  })
}

//checks the stock of the selected product
function checkStock (id, quant) {
  connection.query(
    'SELECT * FROM products WHERE id=?', [id],
    function(err, res) {
      var stock = res[0].stock_quantity;
      var price = res[0].price;
      var name = res[0].product_name;
      if (err) throw err;
      if (stock < quant) {
        console.log('Sorry we only have ' + stock + ' available.');
        start();
      } else {
        buyProduct(id, quant, stock, price);
      }
    }
  )
}

/*removes the product from the inventory
inventory has already been evaluated for removal*/
function buyProduct(id, quant, stock, price) {
  connection.query(
    'UPDATE products SET ? WHERE id=?', [
      {
        stock_quantity: (stock-quant)
      },
      id],
    function(err) {
      if (err) throw err;
      console.log('BAM! Thank you for your purchase!');
      console.log('Your total comes to: $' + quant*price);
      console.log('Please come again soon!');
      connection.end();
    }
  )
}