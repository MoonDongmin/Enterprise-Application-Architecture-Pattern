import {Mapper} from "../mapper/mapper.ts";
import {Artist} from "./artist.ts";

export class ArtistMapper extends Mapper {
    private tableName: string = "artist";

    constructor(db: any) {
        super(db); // Mapper 클래스의 생성자 호출
    }

    async findAll() {
        return await this.db.all(`SELECT * FROM ${this.tableName}`);
    }

    // 데이터 삽입 메서드
    public async insert(obj: Artist): Promise<void> {
        await this.db.run(
            `INSERT INTO ${this.tableName} (id, name, artTitle, image) VALUES (?, ?, ?, ?)`,
            [obj.id, obj.name, obj.artTitle, obj.image],
        );
    }

    // 데이터 업데이트 메서드
    public async update(obj: Artist): Promise<void> {
        await this.db.run(
            `UPDATE ${this.tableName} SET name = ?, artTitle = ?, image = ? WHERE id = ?`,
            [obj.name, obj.artTitle, obj.image, obj.id],
        );
    }

    public async delete(obj: Artist) {
        await this.db.run(
            `DELETE FROM ${this.tableName} WHERE id = ?`, [obj.id],
        );
    }
}
