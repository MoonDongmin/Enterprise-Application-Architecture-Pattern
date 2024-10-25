import {DomainObject} from "../domainObject.ts";
import {Singer}       from "../singer/singer.ts";

export class Album extends Singer implements DomainObject {
    albumId: number;
    albumTitle: string;
    releaseDate: string;

    constructor(id: number, name: string, age: number, gender: string, singerId: number, genre: string, albumId: number, albumTitle: string, releaseDate: string) {
        super(id, name, age, gender, singerId, genre);
        this.albumId = albumId;
        this.albumTitle = albumTitle;
        this.releaseDate = releaseDate;
    }
}
