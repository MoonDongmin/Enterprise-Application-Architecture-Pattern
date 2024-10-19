import {Database} from "sqlite";
import {User}     from "./user.ts";

/*
    * 전체 테이블에 대한 관련 로직을 구현하는게 맞음
    * 하지만 개별행에 대한 로직도 가능은 함
    * ex) 전체 이메일 공백 제거...
*/
export class UserGateway {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    // 모든 사용자 테이블 가져오기
    async findAll(): Promise<User[]> {
        return await this.db.all("SELECT * FROM users"); // 타입을 명시적으로 User[]로 변환
    }

    // ID로 사용자 찾기
    async findById(id: number): Promise<User | undefined> {
        return await this.db.get("SELECT * FROM users WHERE id = ?", id);
    }


    // Email로 사용자 찾기
    async findByEmail(email: string): Promise<User | undefined> {
        return await this.db.get("SELECT * FROM users WHERE email = ?", email);
    }


    // 사용자 생성
    async create(name: string, email: string): Promise<User> {
        const newUser = await this.db
            .run("INSERT INTO users (name, email) VALUES (?, ?)", name, email);
        return {
            id: newUser.lastID,
            name,
            email,
        } as User;
    }

    // 사용자 업데이트
    async update(
        id: number,
        name: string,
        email: string,
    ): Promise<User | undefined> {
        await this.db
            .run("UPDATE users SET name = ?, email = ? WHERE id = ?", name, email, id);
        return await this.findById(id);
    }

    // 사용자 삭제
    async delete(id: number): Promise<any> {
        return await this.db.run("DELETE FROM users WHERE id = ?", id);
    }
}
