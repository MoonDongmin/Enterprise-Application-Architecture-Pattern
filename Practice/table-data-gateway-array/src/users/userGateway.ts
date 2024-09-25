import {User} from "./user.ts";

export class UserGateway {
    private users: User[];

    constructor(users: User[]) {
        this.users = users;
    }


    public findAll(): User[] {
        return this.users;
    }

    public findById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public create(user: User): User {
        this.users.push(user);
        return user;
    }

    public update(id: number, updatedUser: Partial<User>): User | undefined {
        const user = this.findById(id);
        if (user) {
            if (updatedUser.name !== undefined) {
                user.name = updatedUser.name;
            }
            if (updatedUser.email !== undefined) {
                user.email = updatedUser.email;
            }
            return user;
        }
        return undefined;
    }

    public delete(id: number): boolean {
        const index = this.users.findIndex(user => user.id === id);
        if (index > -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}
