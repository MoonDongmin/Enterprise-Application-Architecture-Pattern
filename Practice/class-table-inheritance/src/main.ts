import {createDB}     from "./database/db.ts";
import {Singer}       from "./singer/singer.ts";
import {Person}       from "./person/person.ts";
import {PersonMapper} from "./person/personMapper.ts";
import {SingerMapper} from "./singer/singerMapper.ts";
import {Album}        from "./album/album.ts";
import {AlbumMapper}  from "./album/albumMapper.ts";
import {TrackMapper}  from "./track/trackMapper.ts";
import {Track}        from "./track/track.ts";
import {Artist}       from "./artist/artist.ts";
import fs             from "node:fs/promises";
import {ArtistMapper} from "./artist/artistMapper.ts";

const main = async () => {
    // 데이터베이스 생성
    const db = await createDB();

    // 사람
    const person = new Person(1, "문동민", 25, "남성");
    const personMapper = new PersonMapper(db);
    await personMapper.insert(person);
    const personList = await personMapper.findAll();
    console.log("사람 정보 : ", personList);
    console.log();

    // 가수
    const singer = new Singer(person.id, person.name, person.age, person.gender, 1, "발라드");
    const singerMapper = new SingerMapper(db);
    await singerMapper.insert(singer);
    const singerList = await singerMapper.findAll();
    console.log("가수 정보 : ",singerList);
    console.log();


    // 앨범
    const album = new Album(person.id, person.name, person.age, person.gender, singer.singerId, singer.genre, 1, "EAA", "2024-10-25");
    const albumMapper = new AlbumMapper(db);
    await albumMapper.insert(album);
    const albums = await albumMapper.findAll();
    console.log("앨범 정보 : ",albums);
    console.log();

    // 트랙
    const track1 = new Track(person.id, person.name, person.age, person.gender, singer.singerId, singer.genre, album.albumId, album.albumTitle, album.releaseDate, 1, "클래스 테이블 상속");
    const track2 = new Track(person.id, person.name, person.age, person.gender, singer.singerId, singer.genre, album.albumId, album.albumTitle, album.releaseDate, 2, "클래스 테이블 상속2");
    const trackMapper = new TrackMapper(db);
    await trackMapper.insert(track1);
    await trackMapper.insert(track2);
    const trackList = await trackMapper.findAll();
    console.log("트랙 정보 : ",trackList);
    console.log();


    // 특정 가수의 track 전체를 찾으려면 조인을 해야함....
    const singerTracks = await singerMapper.findSingerTracks(singer);
    console.log("특정 가수 트랙 리스트 : ",singerTracks);
    console.log();


    // BLOB
    const image = await fs.readFile(
        "/Users/moon/Developments/Enterprise-Application-Architecture-Pattern/Practice/class-table-inheritance/src/한국전자파학회-논문-포스터-001.jpg",
    );

    const artist = new Artist(person.id, person.name, person.age, person.gender, "Poster", image);
    const artistMapper = new ArtistMapper(db);
    await artistMapper.insert(artist);
    const artistList = await artistMapper.findAll();
    console.log("아티스트 정보 : ",artistList);

    await db.close();
};

main().catch();
