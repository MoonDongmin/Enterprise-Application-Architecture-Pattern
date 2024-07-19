"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client/client");
var shoppingCart_1 = require("./shoppinCart/shoppingCart");
var product_1 = require("./product/product");
var order_1 = require("./order/order");
function main() {
    var client = new client_1.Client("문동민");
    var shoppingCart = new shoppingCart_1.ShoppingCart();
    var product1 = new product_1.Product("티셔츠", 20000);
    var product2 = new product_1.Product("바지", 35000);
    shoppingCart.addProduct(product1);
    shoppingCart.addProduct(product2);
    var order = new order_1.Order(client.name, shoppingCart);
    order.showOrder();
}
main();
