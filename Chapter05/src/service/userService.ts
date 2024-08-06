import {User}        from "../users/user.ts";
import {Role}        from "../users/role.ts";
import {UserClass}   from "../users/userClass.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";
import {users}       from "../data/data.ts";

export class UserService {
    private static users: UserClass[] = [...users];

    // 사용자 추가
    public static addUser(name: string, degree: string, role: Role): UserClass {
        const newUser = new UserClass(name, degree, [], role);
        this.users.push(newUser);
        return newUser;
    }

    // 모든 사용자 조회
    public static getAllUsers(): UserClass[] {
        return this.users;
    }


    // 사용자 이름 조회
    public static getUserByName(name: string): UserClass | undefined {
        return this.users.find(user => user.name === name);
    }

    // 멘토와 멘티를 배열로 받아서 유저 검증 후 추가
    public static getUsersByNames(names: string[]): UserClass[] {
        return names.map(name => UserService.getUserByName(name)).filter(user => user !== undefined) as UserClass[];
    }
}
