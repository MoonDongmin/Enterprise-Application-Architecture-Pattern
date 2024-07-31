import {Schedule} from "./schedule.ts";

/*
* 디테일한 세미나 타입?을 정해 놓은 것
*/
export interface Seminar {
    year: number;
    title: string;
    mentor: string[];
    mentee: string[];
    time: string;
    schedule: Schedule[];
}
