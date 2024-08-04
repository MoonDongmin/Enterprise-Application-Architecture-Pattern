import {User}        from "./user.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";
import {Role}        from "./role.ts";

export class UserClass implements User {
    constructor(
        public name: string,
        public degree: string,
        public seminars: MainSeminar[] = [],
        public role: Role,
    ) {
    }


    // 세미나 추가
    public createSeminar(seminar: MainSeminar): void {
        this.seminars.push(seminar);
        console.log("세미나가 성공적으로 생성되었습니다.");
    }
}
