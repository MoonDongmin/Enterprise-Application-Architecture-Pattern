import {Mapper} from "../mapper/mapper.ts";
import {Track}  from "./track.ts";

export class TrackMapper extends Mapper {
    private tableName: string = "track";

    constructor(db: any) {
        super(db);
    }

    async findAll() {
        return await this.db.all(`SELECT * FROM ${this.tableName}`); // 타입을 명시적으로 User[]로 변환
    }

    public async insert(obj: Track): Promise<void> {
        await this.db.run(
            `INSERT INTO ${this.tableName} (title, albumId) VALUES (?, ?)`,
            [obj.albumTitle, obj.albumId],
        );
    }

    public async update(obj: Track): Promise<void> {
        await this.db.run(
            `UPDATE ${this.tableName} SET title = ?, albumId = ? WHERE id = ?`,
            [obj.albumTitle, obj.albumId, obj.id],
        );
    }

    public async delete(obj: Track) {
        await this.db.run(
            `DELETE FROM ${this.tableName} WHERE id = ?`, [obj.id],
        );
    }
}
