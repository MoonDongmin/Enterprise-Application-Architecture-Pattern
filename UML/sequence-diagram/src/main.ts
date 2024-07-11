import {Client}       from "./client/client.ts";
import {Product}      from "./product/product.ts";
import {ShoppingCart} from "./shoppinCart/shoppingCart.ts";
import {Order}        from "./order/order.ts";

function main() {
    const client = new Client("문동민");
    const shoppingCart = new ShoppingCart();

    const product1 = new Product("티셔츠", 20000);
    const product2 = new Product("바지", 35000);

    shoppingCart.addProduct(product1);
    shoppingCart.addProduct(product2);

    const order = new Order(client.name, shoppingCart);
    order.showOrder();
}

main();
