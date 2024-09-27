class PersonGateway {
    private lastName: string;
    private firstName: string;
    private numberOfDependents: number;
    private id: number;

    constructor(id: number, lastName: string, firstName: string, numberOfDependents: number) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.numberOfDependents = numberOfDependents;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getNumberOfDependents(): number {
        return this.numberOfDependents;
    }

    public setNumberOfDependents(numberOfDependents: number): void {
        this.numberOfDependents = numberOfDependents;
    }

    private static updateStatementString: string = `
        UPDATE people 
        SET lastname = ?, firstname = ?, number_of_dependents = ? 
        WHERE id = ?`;

    private static insertStatementString: string = `
        INSERT INTO people (id, lastname, firstname, number_of_dependents) 
        VALUES (?, ?, ?, ?)`;


    // Update method
    // @ts-ignore
    async update(db: Pool): Promise<void> {
        let updateStatement;
        try {
            updateStatement = await db.prepare(PersonGateway.updateStatementString);
            await updateStatement.execute([this.lastName, this.firstName, this.numberOfDependents, this.id]);
        } catch (e) {
            throw new Error(`Update failed: ${e}`);
        } finally {
            if (updateStatement) {
                await updateStatement.close();
            }
        }
    }

    // Insert method
    // @ts-ignore
    async insert(db: Pool): Promise<number> {
        let insertStatement;
        try {
            insertStatement = await db.prepare(PersonGateway.insertStatementString);
            await insertStatement.execute([this.id, this.lastName, this.firstName, this.numberOfDependents]);
            // 가정: Registry는 외부 시스템에서 관리하는 객체를 등록하는 기능
            // Registry.addPerson(this); // 필요하다면 외부 레지스트리 처리 추가
            return this.id;
        } catch (e) {
            throw new Error(`Insert failed: ${e}`);
        } finally {
            if (insertStatement) {
                await insertStatement.close();
            }
        }
    }

    public static load(row: RowDataPacket): PersonGateway {
        const id = row.id;
        let result = Registry.getPerson(id) as PersonGateway;

        if (result !== null) {
            return result;
        }

        const lastNameArg = row.lastname;
        const firstNameArg = row.firstname;
        const numDependentsArg = row.number_of_dependents;

        result = new PersonGateway(id, lastNameArg, firstNameArg, numDependentsArg);
        Registry.addPerson(result);
        return result;
    }
}
