"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDB = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
// DB 생성
const createDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({
        filename: ":memory:",
        driver: sqlite3_1.default.Database,
    });
    yield db.exec(`
    CREATE TABLE IF NOT EXISTS person (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
    );
    
    CREATE TABLE IF NOT EXISTS artist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        artTitle TEXT NOT NULL,
        image BLOB,
        FOREIGN KEY(id) REFERENCES person(id)
    );

    CREATE TABLE IF NOT EXISTS singer (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
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
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        albumId INTEGER,
        FOREIGN KEY(albumId) REFERENCES album(id)
    );
    
  `);
    return db;
});
exports.createDB = createDB;
