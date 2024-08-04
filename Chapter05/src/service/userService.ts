import {User}        from "../users/user.ts";
import {Role}        from "../users/role.ts";
import {UserClass}   from "../users/userClass.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";

export class UserService {
    private static users: User[] = [];

    // 사용자 추가하기
    // 사용자 추가
    public static addUser(name: string, degree: string, role: Role): User {
        const newUser = new UserClass(name, degree, [], role);
        this.users.push(newUser);
        return newUser;
    }

    // 모든 사용자 조회
    public static getAllUsers(): User[] {
        return this.users;
    }


    // 사용자 이름 조회
    public static getUserByName(name: string): User | undefined {
        return this.users.find(user => user.name === name);
    }

    // 세미나 추가
    public static addSeminarToUser(userName: string, seminar: MainSeminar): boolean {
        const user = this.getUserByName(userName);
        if (user) {
            user.seminars.push(seminar);
            return true;
        }
        return false;
    }
}
