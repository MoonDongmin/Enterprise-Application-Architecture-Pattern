class Purchase {
    amount: number;
    paymentMethod: string;
    customer: Customer;
    bucket: Bucket;

    constructor(amount: number, paymentMethod: string, customer: Customer, bucket: Bucket) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.customer = customer;
        this.bucket = bucket;
    }
}
