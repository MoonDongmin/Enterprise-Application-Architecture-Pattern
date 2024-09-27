import {open}  from "sqlite";
import sqlite3 from "sqlite3";

export const openDB = async () => {
    const db = await open({
        filename: ":memory:",
        driver: sqlite3.Database,
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);

    return db;
};
