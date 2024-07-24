import {Player} from "../player.ts";

export class CricketPlayer extends Player {
    battingAverage: number;

    constructor(name: string, battingAverage: number) {
        super(name);
        this.battingAverage = battingAverage;
    }

    getType(): string {
        return "크리켓 선수"
    }
}
