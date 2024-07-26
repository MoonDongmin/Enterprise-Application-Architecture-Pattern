import {DetailSchedule} from "../schedule/detailSchedule.ts";
import {Seminar}        from "../seminar/seminar.ts";
import {WeeklySeminar}  from "../seminar/weeklySeminar.ts";

export const data: DetailSchedule[] = [
    new Seminar(
        2024,
        "TypeScript",
        ["DongMin", "DongJun"],
        ["M", "D"],
        "10:00 - 13:00",
        [
            new WeeklySeminar(1, ["Chapter01. 들어가기", "Chapter02. 기초"], "2024-07-01"),
            new WeeklySeminar(2, ["Chapter03. 중급"], "2024-07-08"),
        ],
    ),
];
