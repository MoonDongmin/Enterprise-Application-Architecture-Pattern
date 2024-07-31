// import readline         from "readline-sync";
// import {MainSeminar} from "./seminar/mainSeminar.ts";
// import {Seminar}     from "./schedule/seminar.ts";
// import {data}        from "./data/data.ts";
//
// function main() {
//     while (true) {
//         console.log("1. 년도별 세미나 목록 보기");
//         console.log("2. 세미나 상세 보기");
//         console.log("3. 세미나 추가하기");
//         console.log("4. 종료하기");
//         const choice = readline.questionInt("선택하세요: ");
//
//         switch (choice) {
//             case 1:
//                 const year: number = readline.questionInt("확인하고 싶은 년도를 입력하시오: ");
//                 MainSeminar.searchSeminarsByYear(data, year);
//                 break;
//             case 2:
//                 const title: string = readline.question("세미나 제목을 입력하세요: ");
//                 const seminarDetails: MainSeminar | undefined = MainSeminar.getSeminarDetails(data, title);
//                 if (seminarDetails) {
//                     console.log(`\n세미나 년도: ${seminarDetails.year}`);
//                     console.log(`세미나 제목: ${seminarDetails.title}`);
//                     console.log(`멘토: ${seminarDetails.mentor.join(", ")}`);
//                     console.log(`멘티: ${seminarDetails.mentee.join(", ")}`);
//                     console.log(`시간: ${seminarDetails.time}`);
//                     console.log("<강의 일정>");
//                     for (const x of seminarDetails.schedule) {
//                         console.log(`  주차: ${x.week}, 날짜: ${x.date}`);
//                         for (const chapter of x.chapters) {
//                             console.log(`    ${chapter}`);
//                         }
//                     }
//                     console.log();
//                 } else {
//                     console.log("해당 제목의 세미나가 없습니다.");
//                 }
//                 break;
//             case 3:
//                 const newSeminar: Seminar = MainSeminar.createSeminar();
//                 data.push(newSeminar);
//                 console.log("새로운 세미나가 추가되었습니다.");
//                 break;
//             case 4:
//                 console.log("프로그램을 종료합니다.");
//                 return;
//             default:
//                 console.log("잘못된 입력입니다.");
//                 break;
//         }
//     }
// }
//
// main();


import readline            from "readline-sync";
import {data}              from "./data/data.ts";
import {SeminarController} from "./controller/SeminarController.ts";

function main() {
    const controller = new SeminarController(data);

    while (true) {
        console.log("1. 년도별 세미나 목록 보기");
        console.log("2. 세미나 상세 보기");
        console.log("3. 세미나 추가하기");
        console.log("4. 종료하기");
        const choice = readline.questionInt("선택하세요: ");

        switch (choice) {
            case 1:
                controller.searchSeminarsByYear();
                break;
            case 2:
                controller.getSeminarDetails();
                break;
            case 3:
                controller.createSeminar();
                break;
            case 4:
                console.log("프로그램을 종료합니다.");
                return;
            default:
                console.log("잘못된 입력입니다.");
                break;
        }
    }
}

main();
