import {MessageGateway} from "./messageGateway";

class MessageGatewayStub extends MessageGateway {
    private messagesSent: number = 0;
    private shouldFailAllMessages: boolean = false;

    protected doSend(messageType: string, args: any[]): number {
        const returnCode = this.isMessageValid(messageType, args);
        if (returnCode === MessageSender.SUCCESS) {
            this.messagesSent++;
        }
        return returnCode;
    }

    private isMessageValid(messageType: string, args: any[]): number {
        if (this.shouldFailAllMessages) return -999;
        if (!MessageGatewayStub.legalMessageTypes().includes(messageType)) {
            return MessageSender.UNKNOWN_MESSAGE_TYPE;
        }
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg === null) {
                return MessageSender.NULL_PARAMETER;
            }
        }
        return MessageSender.SUCCESS;
    }

    public static legalMessageTypes(): string[] {
        const result: string[] = [];
        result.push(MessageGateway.CONFIRM);
        return result;
    }

    public failAllMessages(): void {
        this.shouldFailAllMessages = true;
    }

    public getNumberOfMessagesSent(): number {
        return this.messagesSent;
    }
}
