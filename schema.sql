DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DEC(6,2),
    stock_quantity INT(10),
    PRIMARY KEY (id)
);
