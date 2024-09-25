import {Database} from "sqlite";
import {User}     from "./user.ts";

export class UserGateway {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    // 모든 사용자 찾기
    async findAll(): Promise<User[]> {
        const users = await this.db.all("SELECT * FROM users");
        return users as User[]; // 타입을 명시적으로 User[]로 변환
    }

    // ID로 사용자 찾기
    async findById(id: number): Promise<User | undefined> {
        const user = await this.db.get("SELECT * FROM users WHERE id = ?", id);
        return user as User | undefined; // 타입을 명시적으로 User로 변환
    }

    // 사용자 생성
    async create(name: string, email: string): Promise<User> {
        const newUser = await this.db.run("INSERT INTO users (name, email) VALUES (?, ?)", name, email);
        return {
            id: newUser.lastID,
            name,
            email,
        } as User; // 반환 타입을 User로 지정
    }

    // 사용자 업데이트
    async update(id: number, name: string, email: string): Promise<User | undefined> {
        await this.db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", name, email, id);
        return await this.findById(id); // 업데이트 후 수정된 사용자 반환
    }

    // 사용자 삭제
    async delete(id: number): Promise<boolean> {
        const result = await this.db.run("DELETE FROM users WHERE id = ?", id);
        return result?.changes !== undefined && result.changes > 0;
    }
}
