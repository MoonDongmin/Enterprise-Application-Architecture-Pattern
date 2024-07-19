import {Player}        from "../player";

export class BowlingPlayer extends Player {
    bowlingAverage: number;

    constructor(name: string, bowlingAverage: number) {
        super(name);
        this.bowlingAverage = bowlingAverage;
    }

    getType(): string {
        return "볼링 선수";

    }

}
