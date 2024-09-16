import { Pool } from 'mysql2/promise';

class PersonFinder {
    private static readonly findStatementString: string = `
        SELECT id, lastname, firstname, number_of_dependents 
        FROM people 
        WHERE id = ?`;

    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    // Find method using Long ID (using Promises/Async)
    public async find(id: number): Promise<PersonGateway | null> {
        let result = Registry.getPerson(id) as PersonGateway;
        if (result !== null) {
            return result;
        }

        let [rows]: any[] = [];
        try {
            [rows] = await this.db.execute(PersonFinder.findStatementString, [id]);
            if (rows.length === 0) {
                return null;
            }

            // Assuming PersonGateway has a load method to map row to object
            result = PersonGateway.load(rows[0]);
            return result;
        } catch (e) {
            throw new Error(`Database query failed: ${e}`);
        }
    }

    // Overloaded method for handling long as a number
    public async findByLong(id: number): Promise<PersonGateway | null> {
        return await this.find(id);
    }
}
