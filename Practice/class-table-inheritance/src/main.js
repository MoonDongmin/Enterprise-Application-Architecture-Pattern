"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./database/db");
function main() {
    // 데이터베이스 생성
    (0, db_1.createDB)();
}
main();
