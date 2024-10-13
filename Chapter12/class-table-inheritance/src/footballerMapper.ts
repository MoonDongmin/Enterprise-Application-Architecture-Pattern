import {AbstractPlayerMapper} from "./abstractPlayerMapper";
import {Mapper}               from "./mapper";
import {DomainObject}         from "./sub/domainObject";
import {DataRow}              from "./sub/dataRow";

export class FootballerMapper extends AbstractPlayerMapper, Mapper {
    public override get typeCode(): string {
        return "F";
    }

    protected static TABLENAME: string = "Footballers";

    public find(id: number): Footballer {
        return AbstractFind(id, FootballerMapper.TABLENAME);
    }

    protected override CreateDomainObject(): DomainObject {
        return new Footballer();
    }

    protected override Load(obj: DomainObject): void {
        const row: DataRow = this.FindRow(obj.id, this.tableFor(FootballerMapper.TABLENAME));
        // Footballer에 맞는 데이터 로드
        obj.club = row["club"]
    }
}
