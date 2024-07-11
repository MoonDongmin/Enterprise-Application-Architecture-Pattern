import {Product} from "../product/product.ts";

export class ShoppingCart {
    private selectedProducts: Product[] = [];

    addProduct(product: Product): void {
        this.selectedProducts.push(product);
    }

    getSelectedProducts(): Product[] {
        return this.selectedProducts;
    }

    calculateTotal(): number {
        let total = 0;
        for (const product of this.selectedProducts) {
            total += product.price;
        }
        return total;
    }
}
