import {Mapper} from "./mapper";

export class AbstractPlayerMapper extends Mapper {
    protected override load(domainObject: any, row: DataRow): void {
        super.load(domainObject, row); // 부모 클래스의 load 메서드 호출
        const player = domainObject as Player; // 타입 캐스팅
        player.name = row["name"] as string; // name 속성 로드
    }

    protected override save(obj: DomainObject, row: DataRow): void {
        const player = obj as Player;
        row["name"] = player.name;
    }
}
