import sqlite3         from "sqlite3";
import {Player}        from "../player/player.ts";
import {SoccerPlayer}  from "../player/soccer-player/soccer.player.ts";
import {CricketPlayer} from "../player/cricket-player/cricket.player.ts";
import {BowlingPlayer} from "../player/bowling-player/bowling.player.ts";

const db = new sqlite3.Database(":memory:");

// DB 열기
const openDB = async () => {
    return new Promise<void>((resolve, reject) => {
        db.on("open", () => {
            console.log("DB가 열렸습니다.");
            resolve();
        });
        db.on("error", (err) => {
            reject(err);
        });
    });

};

// DB 닫기
const closeDB = async () => {
    return new Promise<void>((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                console.log("DB가 닫혔습니다.");
                resolve();
            }
        });
    });
};

// 테이블 생성
const createTable = async () => {
    return new Promise<void>((resolve, reject) => {
       db.run(`
          CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            club TEXT,
            battingAverage REAL,
            bowlingAverage REAL,
            type TEXT
          )
        `, (err) => {
            if (err) {
                reject(err);
            } else {
                console.log("테이블이 생성되었습니다.");
                resolve();
            }
        });
    });
};

// 선수 삽입
const insertPlayer = async (
    player: Player,
) => {
    //   let name: string = player.name;
    //   let club: string | null = null;
    //   let battingAverage: number | null = null;
    //   let bowlingAverage: number | null = null;
    //   let type: string = player.getType();
    //
    //
    //   if (player instanceof SoccerPlayer) {
    //       club = player.club;
    //   } else if (player instanceof CricketPlayer) {
    //       battingAverage = player.battingAverage;
    //   } else if (player instanceof BowlingPlayer) {
    //       bowlingAverage = player.bowlingAverage;
    //   }
    //
    //   database.run(`
    //   INSERT INTO players (name, club, battingAverage, bowlingAverage, type)
    //   VALUES (?, ?, ?, ?, ?)
    // `, [name, club, battingAverage, bowlingAverage, type]);
    //
    //   console.log("선수가 삽입되었습니다.");
    return new Promise<void>((resolve, reject) => {
        const name: string = player.name;

        let club: string | null = null;
        let battingAverage: number | null = null;
        let bowlingAverage: number | null = null;
        let type: string = player.getType();

        if (player instanceof SoccerPlayer) {
            club = player.club;
        } else if (player instanceof CricketPlayer) {
            battingAverage = player.battingAverage;
        } else if (player instanceof BowlingPlayer) {
            bowlingAverage = player.bowlingAverage;
        }

        db.run(`
            INSERT INTO players (name, club, battingAverage, bowlingAverage, type)
            VALUES (?, ?, ?, ?, ?)
        `, [name, club, battingAverage, bowlingAverage, type], (err) => {
            if (err) {
                reject(err);
            } else {
                console.log("선수가 삽입되었습니다.");
                resolve();
            }
        });
    });
};

// 선수 조회
const fetchPlayers = async () => {
    return new Promise<any[]>((resolve, reject) => {
        db.all("SELECT * FROM players", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });

    });
};

export const DbHandler = {
    openDB,
    closeDB,
    createTable,
    insertPlayer,
    fetchPlayers,
};
