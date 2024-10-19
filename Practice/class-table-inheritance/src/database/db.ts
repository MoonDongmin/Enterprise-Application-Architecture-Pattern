import {open}  from "sqlite";
import sqlite3 from "sqlite3";

export class Db {
    // DB 생성
    public createDB = async () => {
        const db = await open({
            filename: ":memory:",
            driver: sqlite3.Database,
        });
        await db.exec(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
    )
  `);
        return db;
    };
}
