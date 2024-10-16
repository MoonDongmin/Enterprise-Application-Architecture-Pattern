import {Mapper}  from "./mapper";
import {Gateway} from "./gateway";

export class PlayerMapper extends Mapper {
    private bmapper: BowlerMapper;
    private cmapper: CricketerMapper;
    private fmapper: FootballerMapper;
    private gateway: Gateway; // Gateway 인스턴스를 필드로 보유

    constructor(gateway: Gateway) {
        super(gateway);
        this.gateway = gateway;
        this.bmapper = new BowlerMapper(gateway);
        this.cmapper = new CricketerMapper(gateway);
        this.fmapper = new FootballerMapper(gateway);
    }

    public find(key: number): Player | null {
        let result: Player | null;

        result = this.fmapper.find(key);
        if (result !== null) return result;

        result = this.bmapper.find(key);
        if (result !== null) return result;

        result = this.cmapper.find(key);
        if (result !== null) return result;

        return null; // 모든 매퍼에서 찾지 못했을 경우 null 반환
    }

    public override update(obj: DomainObject): void {
        this.mapperFor(obj).update(obj); // 적절한 매퍼로 업데이트 호출
    }

    private mapperFor(obj: DomainObject): Mapper {
        if (obj instanceof Footballer) {
            return this.fmapper; // Footballer일 경우
        } else if (obj instanceof Bowler) {
            return this.bmapper; // Bowler일 경우
        } else if (obj instanceof Cricketer) {
            return this.cmapper; // Cricketer일 경우
        } else {
            throw new Error("에러"); // 오류 처리
        }
    }

    public override insert(obj: DomainObject): number {
        return this.mapperFor(obj).insert(obj);
    }

    public delete(obj: DomainObject): void {
        this.mapperFor(obj).delete(obj); // 적절한 매퍼를 사용하여 삭제
    }
}
