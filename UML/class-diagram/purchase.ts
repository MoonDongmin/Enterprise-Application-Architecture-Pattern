class Purchase {
    amount: number;
    paymentMethod: string;
    customer: Customer;
    cart: Cart;

    constructor(amount: number, paymentMethod: string, customer: Customer, cart: Cart) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.customer = customer;
        this.cart = cart;
    }
}
