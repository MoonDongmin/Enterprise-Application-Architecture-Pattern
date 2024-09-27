import {UserGateway}     from "./users/userGateway.ts";
import {openDB}          from "./database/db.ts";
import {UserTableModule} from "./users/userTableModule.ts";


const main = async () => {
    const db = await openDB();
    const userGateway = new UserGateway(db);
    const userModule = new UserTableModule(userGateway);

    // 사용자 생성
    const user1 = await userModule.createUser("DongMin", "DongMin@naver.com");
    const user2 = await userModule.createUser("DongJun", "DongJun@naver.com");
    const user3 = await userModule.createUser("DongDong", "DongDong@naver.com");
    // const user4 = await userModule.createUser("DongDong", "DongDong@naver.com");
    console.log("Created User:", user1);
    console.log("Created User:", user2);
    console.log("Created User:", user3);
    // console.log("Created User:", user4);
    console.log();

    // 모든 사용자 조회
    const users = await userModule.getAllUsers();
    console.log("All Users:", users);
    console.log();

    // 특정 사용자 조회
    const uniqueUser = await userModule.getUserById(1);
    console.log("Found User:", uniqueUser);
    console.log();

    // 사용자 업데이트
    const updatedUser = await userModule.updateUser(1, "Update", "Update@naver.com");
    console.log("Updated User:", updatedUser);
    console.log();

    // 사용자 삭제
    const deleted = await userModule.deleteUser(1);
    const users2 = await userModule.getAllUsers();
    console.log(deleted ? "User deleted" : "User not found");
    console.log(users2);

    await db.close();
};

main().catch(console.error);
