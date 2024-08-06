// main.ts
import readline            from "readline-sync";
import {data}              from "./data/data.ts";
import {SeminarController} from "./controller/seminarController.ts";
import {UserController}    from "./controller/userController.ts";

function main() {
    const seminarController = new SeminarController(data);

    while (true) {
        console.log("1. 년도별 세미나 목록 보기");
        console.log("2. 세미나 상세 보기");
        console.log("3. 세미나 추가하기");
        console.log("4. 사용자 추가하기");
        console.log("5. 사용자 조회하기");
        console.log("6. 종료하기");
        const choice = readline.questionInt("선택하세요: ");

        switch (choice) {
            case 1:
                seminarController.searchSeminarsByYear();
                break;
            case 2:
                seminarController.getSeminarDetails();
                break;
            case 3:
                seminarController.createSeminar();
                break;
            case 4:
                UserController.addUser();
                break;
            case 5:
                UserController.getUserByName();
                break;
            case 6:
                console.log("프로그램을 종료합니다.");
                return;
            default:
                console.log("잘못된 입력입니다.");
                break;
        }
    }
}

main();
