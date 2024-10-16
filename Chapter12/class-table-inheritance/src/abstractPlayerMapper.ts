import {DomainObject} from "./data/domainObject";
import {Mapper}       from "./mapper";

export abstract class AbstractPlayerMapper extends Mapper {
    abstract get typeCode(): string;

    protected static tableName: string = "Players";

    protected override load(obj: DomainObject): void {
        const row = this.findRow(obj.id, this.tableFor(AbstractPlayerMapper.tableName));
        const player = obj as Player; // Type assertion
        player.name = row["name"] as string;
    }

    protected override addRow(obj: DomainObject) {
        super.InsertRow(obj, AbstractPlayerMapper.tableName);
    }

    protected override delete(obj: DomainObject) {
        const row = this.findRow(obj.id, this.tableFor(AbstractPlayerMapper.tableName));
        row.Delete();
    }
}
