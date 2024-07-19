import { Product } from "../product/product";
import {ShoppingCart} from "../shoppinCart/shoppingCart";

export class Order {
    clientName: string;
    shoppingCart: ShoppingCart;

    constructor(clientName: string, shoppingCart: ShoppingCart) {
        this.clientName = clientName;
        this.shoppingCart = shoppingCart;
    }

    showOrder() {
        const selectProducts: Product[] = this.shoppingCart.getSelectedProducts();
        const total: number = this.shoppingCart.calculateTotal();

        console.log(`고객 이름: ${this.clientName}`);
        for (let product of selectProducts) {
            console.log(`상품: ${product.name}, 가격: ${product.price}`);
        }
        console.log(`합계: ${total}`);
    }
}
