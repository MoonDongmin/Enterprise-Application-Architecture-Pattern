class Order {
    id: string;
    amount: number;
    symbol: string;

    constructor(id: string, amount: number, symbol: string) {
        this.id = id;
        this.amount = amount;
        this.symbol = symbol;
    }

    isValid(): boolean {
        // ...
    }

    sendConfirmation(): void {
        if (this.isValid()) {
            Environment.getMessageGateway().sendConfirmation(this.id, this.amount, this.symbol);
        }
    }
}
