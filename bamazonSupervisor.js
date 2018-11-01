// Grabs department info

//console.table prints array of table rows in the console.
/*var printer = require('console.table')
  var inquirer = require('inquirer')
  var mysql = require('mysql')*/

//for the View ALL
/*grab all departments (SELECT * FROM departments) then forEach department search 
(WHERE products.department_name = departments.department_name) or GROUPBY department_name
 = products for each deparment
sum the product sales for each product
Sales_total - overhead costs = total_profit*/


//For the create new Department
/*INSERT INTO departments (dept_name, overhead_costs)
  VALUES (?, ?, ?), [vals from inquirer]*/