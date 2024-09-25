import {UserGateway}   from "./users/userGateway.ts";
import {usersDatabase} from "./database/db.ts";

const userGateway = new UserGateway(usersDatabase);

// 모든 사용자 가져오기
console.log("모든 사용자 가져오기");
console.log(userGateway.findAll());
console.log();


// 특정 사용자 가져오기
console.log("특정 사용자 가져오기");
console.log(userGateway.findById(1));
console.log();


// 사용자 생성
userGateway.create({
    id: 4,
    name: "AAA",
    email: "AAA@naver.com",
});
console.log("사용자 생성");
console.log(userGateway.findAll());
console.log();


// 사용자 업데이트
userGateway.update(2, {name: "DDD", email:"DDD@naver.com"});
console.log("사용자 업데이트");
console.log(userGateway.findAll());
console.log();


// 사용자 삭제
userGateway.delete(1);
console.log("사용자 삭제");
console.log(userGateway.findAll());
console.log();

