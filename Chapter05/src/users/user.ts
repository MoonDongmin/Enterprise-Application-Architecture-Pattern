import {MainSeminar} from "../seminar/mainSeminar.ts";
import {Role}        from "./role.ts";

export interface User {
    name: string;
    degree: string;
    seminars: MainSeminar[];
    role: Role;
}
