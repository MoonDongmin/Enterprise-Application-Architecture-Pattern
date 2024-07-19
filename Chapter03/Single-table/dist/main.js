import { SoccerPlayer } from "./player/soccer-player/soccer.player.js";
import { DbHandler } from "./Database/database.js";
import { CricketPlayer } from "./player/cricket-player/cricket.player.js";
import { BowlingPlayer } from "./player/bowling-player/bowling.player.js";
async function main() {
    const soccerPlayer = new SoccerPlayer("문동민", "김천상무");
    console.log(`축구 선수: ${soccerPlayer.name}, 클럽: ${soccerPlayer.club}`);
    const cricketPlayer = new CricketPlayer("문금민", 0.777);
    console.log(`크라켓 선수: ${cricketPlayer.name}, 타율: ${cricketPlayer.battingAverage}`);
    const bowlingPlayer = new BowlingPlayer("문은민", 100);
    console.log(`볼링 선수: ${bowlingPlayer.name}, 볼링에버리지: ${bowlingPlayer.bowlingAverage}`);
    await DbHandler.openDB();
    console.log();
    await DbHandler.createTable();
    console.log();
    await DbHandler.insertPlayer(soccerPlayer);
    await DbHandler.insertPlayer(cricketPlayer);
    await DbHandler.insertPlayer(bowlingPlayer);
    const currentDbPlayer = await DbHandler.fetchPlayers();
    console.log(currentDbPlayer);
    console.log();
    await DbHandler.closeDB();
}
main();
