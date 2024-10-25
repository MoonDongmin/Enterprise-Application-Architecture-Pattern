import {Mapper}       from "../mapper/mapper.ts";
import {Person}       from "./person.ts";

export class PersonMapper extends Mapper {
    private tableName: string = "person";

    constructor(db: any) {
        super(db); // Mapper 클래스의 생성자 호출
    }

    async findAll() {
        return await this.db.all(`SELECT * FROM ${this.tableName}`);
    }

    // 데이터 삽입 메서드
    public async insert(obj: Person): Promise<void> {
        await this.db.run(
            `INSERT INTO ${this.tableName} (name, age, gender) VALUES (?, ?, ?)`,
            [obj.name, obj.age, obj.gender],
        );
    }

    // 데이터 업데이트 메서드
    public async update(obj: Person): Promise<void> {
        await this.db.run(
            `UPDATE ${this.tableName} SET name = ?, age = ?, gender = ? WHERE id = ?`,
            [obj.name, obj.age, obj.gender, obj.id],
        );
    }

    public async delete(obj: Person) {
        await this.db.run(
            `DELETE FROM ${this.tableName} WHERE id = ?`, [obj.id],
        );
    }
}
