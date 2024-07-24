import { Player } from "../player.ts";
export class CricketPlayer extends Player {
    constructor(name, battingAverage) {
        super(name);
        Object.defineProperty(this, "battingAverage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.battingAverage = battingAverage;
    }
    getType() {
        return "크리켓 선수";
    }
}
