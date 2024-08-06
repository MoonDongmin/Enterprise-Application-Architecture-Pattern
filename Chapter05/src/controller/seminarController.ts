import {MainSeminar}    from "../seminar/mainSeminar.ts";
import readline         from "readline-sync";
import {SeminarService} from "../service/seminarService.ts";
import {WeeklySeminar}  from "../seminar/weeklySeminar.ts";
import {Schedule}       from "../schedule/schedule.ts";
import {Seminar}        from "../schedule/seminar.ts";
import {UserService}    from "../service/userService.ts";

// 사용자와 상호작용하는 부분
export class SeminarController {
    private seminars: Seminar[] = [];

    constructor(seminars: Seminar[]) {
        this.seminars = seminars;
    }

    // 년도별 세미나 찾기
    public searchSeminarsByYear(): void {
        const year: number = readline.questionInt("찾고 싶은 년도를 입력하시오: ");
        const results = SeminarService.searchSeminarsByYear(this.seminars, year);
        results.forEach(seminar => console.log(seminar.title));
        console.log();
    }

    // 세미나 상세 조회
    public getSeminarDetails(): void {
        const title: string = readline.question("세미나 제목을 입력하세요: ");
        const seminar = SeminarService.getSeminarDetails(this.seminars, title);
        if (seminar) {
            console.log(seminar);
        } else {
            console.log("세미나를 찾을 수 없습니다.");
        }
    }

    public createSeminar(): void {
        // 년도 등록
        const year: number = readline.questionInt("년도를 입력하시오: ");

        // 제목 등록
        const title: string = readline.question("세미나 제목을 입력하세요: ");

        // 멘토 등록
        const mentorCount: number = readline.questionInt("멘토 수를 입력하세요: ");
        const mentorNames: string[] = [];
        for (let i = 0; i < mentorCount; i++) {
            mentorNames.push(readline.question(`${i + 1}번 째 멘토 이름을 입력하세요: `));
        }

        // 멘티 등록
        const menteeCount: number = readline.questionInt("멘티 수를 입력하세요: ");
        const menteeNames: string[] = [];
        for (let i = 0; i < menteeCount; i++) {
            menteeNames.push(readline.question(`${i + 1}번 째 멘티 이름을 입력하세요: `));
        }

        // 멘토와 멘티 사용자 확인
        const mentors = UserService.getUsersByNames(mentorNames);
        const mentees = UserService.getUsersByNames(menteeNames);

        if (mentors.length !== mentorCount || mentees.length !== menteeCount) {
            console.log("입력한 멘토 또는 멘티 중 일부를 찾을 수 없습니다.");
            return;
        }

        // 세미나 시간 입력
        const time: string = readline.question("세미나 시간을 입력하세요 (예: 10:00 - 13:00): ");

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

        const newSeminar = SeminarService.createSeminar(year, title, mentors, mentees, time, schedule);
        this.seminars.push(newSeminar as MainSeminar);
        console.log("세미나가 성공적으로 생성되었습니다.");

        // 생성된 세미나를 각 멘토와 멘티에 추가
        mentors.forEach(mentor => mentor.addSeminar(newSeminar as MainSeminar));
        mentees.forEach(mentee => mentee.addSeminar(newSeminar as MainSeminar));
    }

    // 세미나 수정

    // 세미나 삭제
}
