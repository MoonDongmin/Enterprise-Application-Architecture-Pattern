import {open}  from "sqlite";
import sqlite3 from "sqlite3";

// DB 생성
export const createDB = async () => {
    const db = await open({
        filename: ":memory:",
        driver: sqlite3.Database,
    });
    await db.exec('PRAGMA foreign_keys = ON');

    await db.exec(`
    CREATE TABLE IF NOT EXISTS person (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       age INTEGER NOT NULL,
       gender TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS artist (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        artTitle TEXT NOT NULL,
        image BLOB,
        FOREIGN KEY(id) REFERENCES person(id)
    );

    CREATE TABLE IF NOT EXISTS singer (
        id INTEGER PRIMARY KEY,
        genre TEXT NOT NULL,
        FOREIGN KEY(id) REFERENCES person(id)
     );
 
    CREATE TABLE IF NOT EXISTS album (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        releaseDate TEXT NOT NULL,
        singerId INTEGER,
        FOREIGN KEY(singerId) REFERENCES singer(id)
    );

    CREATE TABLE IF NOT EXISTS track (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        albumId INTEGER NOT NULL,
        FOREIGN KEY(albumId) REFERENCES album(id)
    );
  `);
    return db;
};

