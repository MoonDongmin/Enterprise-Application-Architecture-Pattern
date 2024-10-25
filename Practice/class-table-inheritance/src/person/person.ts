import {DomainObject} from "../domainObject.ts";

export class Person implements DomainObject {
    id: number;
    name: string;
    age: number;
    gender: string;

    constructor(personId: number, name: string, age: number, gender: string) {
        this.id = personId;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
