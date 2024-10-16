import {Mapper}               from "./mapper";
import {AbstractPlayerMapper} from "./abstractPlayerMapper";

export class CricketMapper extends AbstractPlayerMapper {
    public override get tableName(): string {
        return "Cricketers";
    }

    public find(id: number): Cricketer | null {
        return this.abstractFind(id, this.tableName) as Cricketer; // ID로 Cricketer 찾기
    }

    protected override createDomainObject(): Cricketer {
        return new Cricketer(); // Cricketer 객체 생성
    }

    protected override load(domainObject: Cricketer, row: DataRow): void {
        super.load(domainObject, row); // 부모 클래스의 load 메서드 호출
        domainObject.battingAverage = row["battingAverage"] as number; // battingAverage 속성 로드
    }

    protected override save(obj: DomainObject, row: DataRow): void {
        super.save(obj, row); // 부모 클래스의 save 메서드 호출

        const cricketer = obj as Cricketer; // obj를 Cricketer로 캐스팅
        row["battingAverage"] = cricketer.battingAverage; // battingAverage 저장
    }

}
