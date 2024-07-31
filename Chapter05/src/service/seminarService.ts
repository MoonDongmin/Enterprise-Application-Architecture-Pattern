import {Seminar}     from "../schedule/seminar.ts";
import {Schedule}    from "../schedule/schedule.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";

// 비즈니스 로직
export class SeminarService {
    // 년도별 세미나 찾기
    public static searchSeminarsByYear(seminars: Seminar[], year: number): Seminar[] {
        return seminars.filter(seminar => seminar.year === year);
    }

    // 세미나 상세 조회
    public static getSeminarDetails(seminars: Seminar[], title: string): Seminar | undefined {
        return seminars.find(seminar => seminar.title === title);
    }

    // 세미나 만들기
    public static createSeminar(
        year: number,
        title: string,
        mentor: string[],
        mentee: string[],
        time: string,
        schedule: Schedule[],
    ): Seminar {
        return new MainSeminar(year, title, mentor, mentee, time, schedule);
    }
}
