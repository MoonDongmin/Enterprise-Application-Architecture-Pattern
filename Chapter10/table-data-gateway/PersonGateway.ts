// @ts-ignore
// @ts-ignore
import {
    Pool,
    RowDataPacket,
} from "mysql2/promise";

class PersonGateway {
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    async findAll(): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM person";
        const [rows] = await this.db.query<RowDataPacket[]>(sql);
        return rows;
    }

    async findWithLastName(lastName: string): Promise<RowDataPacket[]> {
        const sql = "SELECT * FROM person WHERE lastname = ?";
        const [rows] = await this.db.execute<RowDataPacket[]>(sql, [lastName]);
        return rows;
    }

    async findWhere(whereClause: string): Promise<RowDataPacket[]> {
        const sql = `SELECT * FROM person WHERE ${whereClause}`;
        const [rows] = await this.db.query<RowDataPacket[]>(sql);
        return rows;
    }

    async findRow(key: number): Promise<any[]> {
        const sql = "SELECT * FROM person WHERE id = ?";
        const [rows] = await this.db.execute<RowDataPacket[]>(sql, [key]);

        if (rows.length > 0) {
            const row = rows[0];
            return Object.values(row);
        } else {
            throw new Error("No record found");
        }
    }

    async update(key: number, lastname: string, firstname: string, numberOfDependents: number): Promise<void> {
        const sql = `
            UPDATE person 
            SET lastname = ?, firstname = ?, numberOfDependents = ?
            WHERE id = ?`;
        await this.db.execute(sql, [lastname, firstname, numberOfDependents, key]);
    }

    async insert(lastname: string, firstname: string, numberOfDependents: number): Promise<number> {
        const sql = "INSERT INTO person (id, lastname, firstname, numberOfDependents) VALUES (?,?,?,?)";
        const key = await this.getNextId();  // ID 생성 함수
        await this.db.execute(sql, [key, lastname, firstname, numberOfDependents]);
        return key;
    }

    async delete(key: number): Promise<void> {
        const sql = "DELETE FROM person WHERE id = ?";
        await this.db.execute(sql, [key]);
    }

    private async getNextId(): Promise<number> {
        // ID 생성 로직을 구현 (예시)
        const [rows] = await this.db.query("SELECT MAX(id) as maxId FROM person");
        const maxId = (rows as any[])[0].maxId;
        return maxId + 1;
    }
}
