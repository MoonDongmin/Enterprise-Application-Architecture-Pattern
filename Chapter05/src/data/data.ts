import {Seminar}     from "../schedule/seminar.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";
import {WeeklySeminar}  from "../seminar/weeklySeminar.ts";
import {UserClass} from "../users/userClass.ts";
import {Role} from "../users/role.ts";

// 사용자 데이터
export const users: UserClass[] = [
    new UserClass("dongmin", "4", [], Role.Mentor),
    new UserClass("dongjun", "3", [], Role.Mentor),
    new UserClass("m", "2", [], Role.Mentee),
    new UserClass("d", "1", [], Role.Mentee),
];

export const data: Seminar[] = [
    new MainSeminar(
        2024,
        "TypeScript",
        [users[0], users[1]],  // Mentors
        [users[2], users[3]],
        "10:00 - 13:00",
        [
            new WeeklySeminar(1, ["Chapter01. 들어가기", "Chapter02. 기초"], "2024-07-01"),
            new WeeklySeminar(2, ["Chapter03. 중급"], "2024-07-08"),
        ],
    ),
];



// 사용자와 세미나 연결
users[0].addSeminar(data[0]); // DongMin
users[1].addSeminar(data[0]); // DongJun
users[2].addSeminar(data[0]); // M
users[3].addSeminar(data[0]); // D
