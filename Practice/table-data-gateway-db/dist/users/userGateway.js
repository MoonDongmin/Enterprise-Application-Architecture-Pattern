var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from "pg"; // pg 클라이언트를 가져옵니다.
export class UserGateway {
    constructor() {
        this.client = new Client({
            user: "dongmin",
            host: "127.0.0.1",
            database: "moon",
            password: "postgres",
            port: 5432,
        });
        this.connectAndInitialize(); // 연결 및 초기화 메서드 호출
    }
    // 데이터베이스에 연결하고 초기화합니다.
    connectAndInitialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log("Connected to the database");
                yield this.initialize();
            }
            catch (err) {
                console.error("Connection error", err);
            }
        });
    }
    // 초기 DB 생성
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL
                )
            `);
                console.log("Table created successfully");
            }
            catch (err) {
                console.error("Error creating table", err);
            }
        });
    }
    // 모든 사용자 조회
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query("SELECT * FROM users");
                return res.rows;
            }
            catch (err) {
                console.error("Error fetching all users:", err);
                throw err;
            }
        });
    }
    // ID로 사용자 조회
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query("SELECT * FROM users WHERE id = $1", [id]);
                return res.rows[0] || null;
            }
            catch (err) {
                console.error("Error finding user by ID:", err);
                throw err;
            }
        });
    }
    // 사용자 생성
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id", [user.name, user.email]);
                return Object.assign({ id: res.rows[0].id }, user);
            }
            catch (err) {
                console.error("Error creating user:", err);
                throw err;
            }
        });
    }
    // 사용자 업데이트
    update(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.findById(id);
                if (existingUser) {
                    const newName = updatedUser.name || existingUser.name;
                    const newEmail = updatedUser.email || existingUser.email;
                    yield this.client.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [newName, newEmail, id]);
                    return {
                        id,
                        name: newName,
                        email: newEmail,
                    };
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.error("Error updating user:", err);
                throw err;
            }
        });
    }
    // 사용자 삭제
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query("DELETE FROM users WHERE id = $1", [id]);
                return (res.rowCount || 0) > 0; // rowCount가 null일 경우 0을 반환
            }
            catch (err) {
                console.error("Error deleting user:", err);
                throw err;
            }
        });
    }
    // 데이터베이스 연결 종료
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.end();
        });
    }
}
