import {UserGateway} from "./users/userGateway.ts";
import {openDB}      from "./db.ts";


const main = async () => {
    const db = await openDB();
    const userGateway = new UserGateway(db);

    // 사용자 생성
    const user1 = await userGateway.create("DongMin", "DongMin@naver.com");
    const user2 = await userGateway.create("DongJun", "DongJun@naver.com");
    const user3 = await userGateway.create("DongDong", "DongDong@naver.com");
    console.log("Created User:", user1);
    console.log("Created User:", user2);
    console.log("Created User:", user3);
    console.log();

    // 모든 사용자 조회
    const users = await userGateway.findAll();
    console.log("All Users:", users);
    console.log();

    // 특정 사용자 조회
    const uniqueUser = await userGateway.findById(1);
    console.log("Found User:", uniqueUser);
    console.log();

    // 사용자 업데이트
    const updatedUser = await userGateway.update(1, "Update", "Update@naver.com");
    console.log("Updated User:", updatedUser);
    console.log();

    // 사용자 삭제
    const deleted = await userGateway.delete(1);
    const users2 = await userGateway.findAll();
    console.log(deleted ? "User deleted" : "User not found");
    console.log(users2);

    await db.close();
};

main().catch(console.error);
