/*Performs Reading and inventory adjustment for bamazon*/

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
  console.log('Welcome Bamager!')
  start();
});

function start () {
  inquirer.prompt([
    {
      type: 'list',
      message: 'Options: ',
      name: 'choice',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
  ]).then(function(res) {
    switch(res.choice) {
      case 'View Products for Sale':
        viewProds();
        break;
      case 'View Low Inventory' :
        viewLow();
        break;
      case 'Add to Inventory' :
        addInv();
        break;
      case 'Add New Product' :
        addNew();
        break;
    }

  })
}

//View all Products for sale
function viewProds() {
  connection.query(
    'SELECT * FROM products',
    function(err, res) {
      if (err) throw err;
      console.log('Products Available:');
      printprods(res);
      cont();
    }
  )
}

//Asks user if they want to continue or quit
function cont () {
  inquirer.prompt ({
    type: 'confirm',
    name: 'continue',
    message: 'Would you like to continue working?'
  }).then(function(res) {
    if(res.continue) {
      console.log('\n');
      start();
    } else {
      console.log('Have a good day!');
      console.log('Remember You are Awesome!');
      connection.end();
    }
  })
}

//shows all products that have less than 5 in stock.
function viewLow() {
  connection.query(
    'SELECT * FROM products WHERE stock_quantity < 5',
    function(err, res) {
      if (err) throw err;
      printprods(res);
      cont();
    }
  )
}

//prints all of the database query results
function printprods (res) {
  for (i in res) {
    console.log('ID: ' + res[i].id);
    console.log('Product: ' + res[i].product_name);
    console.log('Price: $' + res[i].price );
    console.log('Stock: ' +  res[i].stock_quantity +'\n');
  }
}

//Adds stock to inventory, 
function addInv () {
  //inquirer asks for product id and quant to add
  inquirer.prompt([
    {
      name: "product",
      message: 'What would you like to add? Product ID:',
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
      message: 'How many would you like to add?',
      validate: function (input) {
          if(Number.isNaN(parseInt(input))) {
            return 'Please select a number.';
          } else {
            return true;
          }
      }
    }]
  ).then(function(res) {
  //mysql UPDATE the product quant
  connection.query(
    'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id=?', [res.quant, res.product], 
    function(err) {
    if (err) throw err;
    console.log('Product Updated!\n');
    cont();
  });

})}

//adds new product to database. asks for all relevent info
function addNew() {
  //inquirer gets all fields
  //TODO: Finish prompt
  inquirer.prompt([
    {
     name: 'prod',
     message: 'Name of Product:'
    },
    {name: 'dept',
     message: 'Department:'},
    {name: 'price',
     message: 'Price:'},
    {name: 'stock',
     message: 'Inventory Count:'}
  ]).then(function(res) {
    connection.query(
      'INSERT INTO products (product_name, department_name, price, stock_quantity)' +
      ' VALUES (?, ?, ?, ?)', 
      [res.prod, res.dept, res.price, res.stock],
      function(err) {
        if (err) throw err;
        console.log('Product Added!');
        cont();
      }
    )
    });
}