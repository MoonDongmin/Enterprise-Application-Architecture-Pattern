import { Player } from "../player.ts";
export class BowlingPlayer extends Player {
    constructor(name, bowlingAverage) {
        super(name);
        Object.defineProperty(this, "bowlingAverage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bowlingAverage = bowlingAverage;
    }
    getType() {
        return "볼링 선수";
    }
}
