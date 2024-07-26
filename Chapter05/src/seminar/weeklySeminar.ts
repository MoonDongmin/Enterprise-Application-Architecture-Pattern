import {Schedule} from "../schedule/schedule.ts";

export class WeeklySeminar implements Schedule {
    constructor(
        public week: number,
        public chapters: string[],
        public date: string,
    ) {
    }
}
