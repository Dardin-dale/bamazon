# bamazon
Inventory management command line interpreter. Utilizes a MySQL database.

## Set-Up
clone the repository and run npm install. Run the SQL schema in you mySQL workbench then upload the inventory csv to the products table for the initial inventory.

## bamazonCustomer
### bamazon customer interface

bamazon customer portal will list the the items available for sale. Then it will ask the customer what they want to buy, and how many of that product that they want to buy. It will be removed from inventory and the total cost will be relayed to the customer.

![GitHub Logo](/pics/customer.PNG)

## bamazonManager
### bamazon manager interface

bamazon manager lets the manager check the stock of each item in the bamazon database.

![GitHub Logo](/pics/manager-view.PNG)

Or let the Manager just items that are low in stock

![GitHub Logo](/pics/manager-low.PNG)

The manager can then add to inventory for a product

![GitHub Logo](/pics/manager-add-inventory.PNG)

Or the manager can add a brand new product to the database

![GitHub Logo](/pics/manager-add-product.PNG)

## bamazonSupervisor
### tracks departments and sales

### COMING SOON!
