import {Seminar}     from "../schedule/seminar.ts";
import {Schedule}    from "../schedule/schedule.ts";
import {MainSeminar} from "../seminar/mainSeminar.ts";
import {UserClass}   from "../users/userClass.ts";

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
        mentor: UserClass[],
        mentee: UserClass[],
        time: string,
        schedule: Schedule[],
    ): Seminar {
        return new MainSeminar(year, title, mentor, mentee, time, schedule);
    }

    // 세미나 수정
    public static updateSeminar(seminars: Seminar[], title: string, updatedSeminar: Seminar): boolean {
        const index = seminars.findIndex(seminar => seminar.title === title);
        if (index !== -1) {
            seminars[index] = updatedSeminar;
            return true;
        }
        return false;
    }

    // 세미나 삭제
    public static deleteSeminar(seminars: Seminar[], title: string): boolean {
        const index = seminars.findIndex(seminar => seminar.title === title);
        if (index !== -1) {
            seminars.splice(index, 1);
            return true;
        }
        return false;
    }

}
