// userController.ts
import { UserService }        from "../service/userService.ts";
import readline, {promptLoop} from "readline-sync";
import {Role}                 from "../users/role.ts";

export class UserController {

    // 사용자 추가
    public static addUser(): void {
        const name: string = readline.question("사용자 이름을 입력하세요: ");
        const degree: string = readline.question("사용자 학위를 입력하세요: ");
        const roleInput: string = readline.question("역할을 입력하세요 (멘토/멘티): ");
        const role: Role = roleInput === "멘토" ? Role.Mentor : Role.Mentee;
        const newUser = UserService.addUser(name, degree, role);
        console.log(`사용자가 성공적으로 추가되었습니다: ${newUser.name}, 학위: ${newUser.degree}, 역할: ${newUser.role}`);
        console.log();
    }

    // 사용자 상세 조회
    public static getUserByName(): void {
        const name: string = readline.question("사용자 이름을 입력하세요: ");
        const user = UserService.getUserByName(name);
        if (user) {
            console.log(`이름: ${user.name}, 학위: ${user.degree}, 역할: ${user.role}`);
            if (user.seminars.length > 0) {
                user.seminars.forEach(seminar => console.log(`세미나: ${seminar.title}`));
            } else {
                console.log("등록된 세미나가 없습니다.");
            }
        } else {
            console.log("사용자를 찾을 수 없습니다.");
        }
        console.log();
    }
}
