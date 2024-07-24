import {Player} from "../player.ts";

export class SoccerPlayer extends Player {
    club: string;

    constructor(name: string, club: string) {
        super(name);
        this.club = club;
    }

    getType(): string {
        return "축구 선수";
    }
}
