class DomainObject {
    private ID: number | null = null;

    constructor(ID?: number) {
        if (ID !== undefined && ID !== null) {
            this.ID = ID;
        }
    }

    getId(): number | null {
        return this.ID;
    }

    setID(ID: number): void {
        if (ID === null || ID === undefined) {
            throw new Error("Cannot set a null or undefined ID");
        }
        this.ID = ID;
    }
}
