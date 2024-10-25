import {DomainObject} from "../domainObject.ts";
import {Album}        from "../album/album.ts";

export class Track extends Album implements DomainObject {
    trackId: number;
    trackTitle: string;

    constructor(id: number, name: string, age: number, gender: string, singerId: number, genre: string, albumId: number, albumTitle: string, releaseDate: string, trackId: number, trackTitle: string) {
        super(id, name, age, gender, singerId, genre, albumId, albumTitle, releaseDate);
        this.trackId = trackId;
        this.trackTitle = trackTitle;
    }
}
