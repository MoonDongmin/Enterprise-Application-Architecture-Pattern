export class MessageGateway {
    protected static readonly CONFIRM = "CNFRM";
    private sender: MessageSender;

    constructor(sender: MessageSender) {
        this.sender = sender;
    }

    public sendConfirmation(orderID: string, amount: number, symbol: string): void {
        const args: any[] = [orderID, amount, symbol];
        this.send(MessageGateway.CONFIRM, args);
    }

    private send(msg: string, args: any[]): void {
        const returnCode = this.doSend(msg, args);
        if (returnCode === MessageSender.NULL_PARAMETER) {
            throw new Error(`Null Parameter passed for msg type: ${msg}`);
        }
        if (returnCode !== MessageSender.SUCCESS) {
            throw new Error(`Unexpected error from messaging system #: ${returnCode}`);
        }
    }

    protected doSend(msg: string, args: any[]): number {
        if (!this.sender) {
            throw new Error("MessageSender is not initialized");
        }
        return this.sender.send(msg, args);
    }
}
