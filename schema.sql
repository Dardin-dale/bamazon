DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DEC(6,2),
    stock_quantity INT(10),
    product_sales DEC(15,2) DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    over_head_costs DEC(15,2),
    PRIMARY KEY (department_id)
);

-- selects all the products
--SELECT * FROM products

