import {Person}       from "../person/person.ts";
import {DomainObject} from "../domainObject.ts";

export class Singer extends Person implements DomainObject {
    singerId: number;
    genre: string;

    constructor(id: number, name: string, age: number, gender: string, singerId: number, genre: string) {
        super(id, name, age, gender);
        this.singerId = singerId;
        this.genre = genre;
    }
}
