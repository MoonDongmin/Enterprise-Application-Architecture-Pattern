import {AbstractPlayerMapper} from "./abstractPlayerMapper";
import {Footballer}           from "./data/footballer";
import {Mapper}               from "./mapper";
import {DomainObject}         from "./data/domainObject";

class FootballerMapper extends AbstractPlayerMapper {
    private mapper: Mapper;

    get typeCode(): string {
        return "F";
    }

    protected static tableName: string = "Footballers";

    public find(id: number): Footballer {
        return this.mapper.abstractFind(id, FootballerMapper.tableName) as Footballer;
    }

    protected createDomainObject(): Footballer {
        return this.mapper.createDomainObject();
    }

    protected override load(obj: DomainObject): void {
        super.load(obj);
        const row = this.findRow(obj.id, this.tableFor(FootballerMapper.tableName));
        const footballer = obj as Footballer; // Type assertion
        footballer.club = row["club"] as string;
    }

    protected override update(obj: DomainObject): void {
        super.update(obj);
        const row = this.findRow(obj.id, this.tableFor(FootballerMapper.tableName));
        const footballer = obj as Footballer;
        footballer.club = row["club"] as string;
    }

    protected override addRow(obj: DomainObject) {
        this.addRow(obj);
        super.InsertRow(obj, FootballerMapper.tableName);
    }

    public override delete(obj: DomainObject) {
        super.delete(obj);
        const row = this.findRow(obj.id, FootballerMapper.tableName);
        row.delete;
    }
}
