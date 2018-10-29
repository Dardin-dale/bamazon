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

function start () {
  inquirer.prompt({
      name: "product",
      message: 'What would you like to buy?'
  }).then(function(res) {

  })
}

//gets products from database and returns an array of products
function getProducts () {
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