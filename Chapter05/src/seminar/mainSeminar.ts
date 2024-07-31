import {Seminar}  from "../schedule/seminar.ts";
import {Schedule} from "../schedule/schedule.ts";
import {WeeklySeminar}  from "./weeklySeminar.ts";
import readline         from "readline-sync";

export class MainSeminar implements Seminar {
    constructor(
        public year: number,
        public title: string,
        public mentor: string[],
        public mentee: string[],
        public time: string,
        public schedule: Schedule[],
    ) {
    }

    // Read: 년도별 세미나 찾기
    public static searchSeminarsByYear(seminars: MainSeminar[], year: number): void {
        for (let x of seminars) {
            if (year === x.year) {
                console.log(x.title);
            }
        }
        console.log();
    }

    // Read: 세미나 상세 조회
    public static getSeminarDetails(seminars: MainSeminar[], title: string): MainSeminar | undefined {
        return seminars.find(seminar => seminar.title === title);
    }

    // Create: 세미나 만들기
    public static createSeminar(): Seminar {
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

        return new MainSeminar(year, title, mentor, mentee, time, schedule);
    }

    // Update: 세미나 수정

    // Delete: 세미나 삭제
}
