import {Mapper} from "../mapper/mapper.ts";
import {Singer} from "./singer.ts";

export class SingerMapper extends Mapper {
    private tableName: string = "singer";

    constructor(db: any) {
        super(db);
    }

    async findAll() {
        return await this.db.all(`SELECT * FROM ${this.tableName}`);
    }

    public async insert(obj: Singer): Promise<void> {
        await this.db.run(
            `INSERT INTO ${this.tableName} (id, genre) VALUES (?, ?)`,
            [obj.id, obj.genre],
        );
    }

    public async update(obj: Singer): Promise<void> {
        await this.db.run(
            `UPDATE ${this.tableName} SET genre = ? WHERE id = ?`,
            [obj.genre, obj.id],
        );
    }

    public async delete(obj: Singer) {
        await this.db.run(
            `DELETE FROM ${this.tableName} WHERE id = ?`, [obj.id],
        );
    }

    public async findSingerTracks(obj: Singer) {
        return await this.db.all(
            `SELECT T.title FROM singer S, album A, track T
         WHERE S.id = A.singerId AND A.id = T.albumId AND S.id = ?`, [obj.id],
        );
    }
}
