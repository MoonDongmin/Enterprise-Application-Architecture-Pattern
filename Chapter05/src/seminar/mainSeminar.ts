import {Seminar}       from "../schedule/seminar.ts";
import {Schedule}      from "../schedule/schedule.ts";
import {UserClass}     from "../users/userClass.ts";

export class MainSeminar implements Seminar {
    constructor(
        public year: number,
        public title: string,
        public mentor: UserClass[],
        public mentee: UserClass[],
        public time: string,
        public schedule: Schedule[],
    ) {
    }
}
