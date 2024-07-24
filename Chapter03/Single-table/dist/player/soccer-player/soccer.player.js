import { Player } from "../player.ts";
export class SoccerPlayer extends Player {
    constructor(name, club) {
        super(name);
        Object.defineProperty(this, "club", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.club = club;
    }
    getType() {
        return "축구 선수";
    }
}
