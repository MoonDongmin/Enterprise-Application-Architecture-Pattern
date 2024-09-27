import {UserGateway} from "./userGateway.ts";
import {User}        from "./user.ts";

export class UserTableModule {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userGateway.findAll();
        return users;
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.userGateway.findById(id);
        if (!user) throw new Error(`User with ID ${id} not found.`);
        return user;
    }


    // 이메일 검증 비즈니스로직
    async createUser(
        name: string,
        email: string,
    ): Promise<User> {
        const existingUsers = await this.userGateway.findByEmail(email);
        if (existingUsers) {
            throw new Error("Email already exists.");
        }
        return await this.userGateway.create(name, email);
    }

    async updateUser(
        id: number,
        name: string,
        email: string,
    ): Promise<User | undefined> {
        const user = await this.getUserById(id);
        if (!user) {
            throw new Error("사용자가 없습니다.");
        }
        // 중복이 없을 경우 업데이트 진행
        return await this.userGateway.update(id, name, email);
    }

    async deleteUser(id: number): Promise<boolean> {
        const user = await this.getUserById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        return await this.userGateway.delete(id);
    }
}
