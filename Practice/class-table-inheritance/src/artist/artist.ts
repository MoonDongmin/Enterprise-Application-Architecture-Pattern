import {Person}       from "../person/person.ts";
import {DomainObject} from "../domainObject";

export class Artist extends Person implements DomainObject {
    artTitle: string;
    image: Buffer;

    constructor(id: number, name: string, age: number, gender: string, artTitle: string, image:Buffer) {
        super(id, name, age, gender);
        this.artTitle = artTitle;
        this.image = image;
    }

}
