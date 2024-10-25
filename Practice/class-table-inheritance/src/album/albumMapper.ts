import {Mapper} from "../mapper/mapper.ts";
import {Album}  from "./album.ts";

export class AlbumMapper extends Mapper{
    private tableName: string = "album";

    constructor(db: any) {
        super(db); // Mapper 클래스의 생성자 호출
    }

    async findAll() {
        return await this.db.all(`SELECT * FROM ${this.tableName}`);
    }

    // 데이터 삽입 메서드
    public async insert(obj: Album): Promise<void> {
        await this.db.run(
            `INSERT INTO ${this.tableName} (id, title, releaseDate, singerId) VALUES (?, ?, ?, ?)`,
            [obj.id, obj.albumTitle, obj.releaseDate, obj.singerId],
        );
    }

    // 데이터 업데이트 메서드
    public async update(obj: Album): Promise<void> {
        await this.db.run(
            `UPDATE ${this.tableName} SET title = ?, releaseDate = ?, singerId = ? WHERE id = ?`,
            [obj.albumTitle, obj.releaseDate, obj.singerId, obj.id],
        );
    }

    public async delete(obj: Album) {
        await this.db.run(
            `DELETE FROM ${this.tableName} WHERE id = ?`, [obj.id],
        );
    }
}
