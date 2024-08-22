class GatewayTester {
    public testSendNullArg(): void {
        try {
            this.gate().sendConfirmation(null, 5, "US");
            throw new Error("Didn't detect null argument");
        } catch (expected) {
            if (!(expected instanceof Error)) {
                throw expected;
            }
        }
        if (this.gate().getNumberOfMessagesSent() !== 0) {
            throw new Error("Expected 0 messages to be sent");
        }
    }

    private gate(): MessageGatewayStub {
        return Environment.getMessageGateway() as MessageGatewayStub;
    }

    protected setUp(): void {
        Environment.testInit();
    }
}
