import {DetailSchedule} from "../schedule/detailSchedule.ts";
import {Schedule}       from "../schedule/schedule.ts";
import {WeeklySeminar}  from "./weeklySeminar.ts";
import readline         from "readline-sync";

export class Seminar implements DetailSchedule {
    constructor(
        public year: number,
        public title: string,
        public mentor: string[],
        public mentee: string[],
        public time: string,
        public schedule: Schedule[],
    ) {
    }

    public static seminarsByYear(seminars: Seminar[], year: number): void {
        for (let x of seminars) {
            if (year === x.year) {
                console.log(x.title);
            }
        }
        console.log();
    }

    public static getSeminarDetails(seminars: Seminar[], title: string): Seminar | undefined {
        return seminars.find(seminar => seminar.title === title);
    }

    public static createSeminar(): DetailSchedule {
        // 년도 등록
        const year: number = readline.questionInt("년도를 입력하시오: ");

        // 제목 등록
        const title: string = readline.question("세미나 제목을 입력하세요: ");

        // 멘토 등록
        const mentorCount: number = readline.questionInt("멘토 수를 입력하세요: ");
        const mentor: string[] = [];
        for (let i = 0; i < mentorCount; i++) {
            mentor.push(readline.question(`${i + 1}번 째 멘토 이름을 입력하세요: `));
        }

        // 멘티 등록
        const menteeCount: number = readline.questionInt("멘티 수를 입력하세요: ");
        const mentee: string[] = [];
        for (let i = 0; i < menteeCount; i++) {
            mentee.push(readline.question(`${i + 1}번 째 멘티 이름을 입력하세요: `));
        }

        // 세미나 시간 입력
        const time: string = readline.question("세미나 시간을 입력하세요 (예: 10:00 - 13:00 ): ");

        // 주차별 강의 등록
        const scheduleCount = readline.questionInt("강의 일정 수를 입력하세요: ");
        const schedule: Schedule[] = [];
        for (let i = 0; i < scheduleCount; i++) {
            const week: number = i + 1;

            const chapters: string[] = [];
            const chapterCount = readline.questionInt(`${i + 1}주차 Chapter 수를 입력하세요: `);
            for (let j = 0; j < chapterCount; j++) {
                chapters.push(readline.question(`Chapter 를 작성하시요 (예: Chapter ${j + 1}. 계층화): `));
            }

            const date: string = readline.question("날짜를 입력하세요: ");
            schedule.push(new WeeklySeminar(week, chapters, date));
        }

        return new Seminar(year, title, mentor, mentee, time, schedule);
    }
}
