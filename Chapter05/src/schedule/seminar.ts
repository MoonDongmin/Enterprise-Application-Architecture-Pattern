import {Schedule} from "./schedule.ts";
import {UserClass} from "../users/userClass.ts";

/*
* 디테일한 세미나 타입?을 정해 놓은 것
*/
export interface Seminar {
    year: number;
    title: string;
    mentor: UserClass[];
    mentee: UserClass[];
    time: string;
    schedule: Schedule[];
}
