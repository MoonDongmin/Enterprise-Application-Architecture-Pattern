import {Footballer}   from "./data/footballer";
import {DomainObject} from "./data/domainObject";

export class Mapper {
    public abstractFind(id: number, tableName: string): Footballer | null {
        const row = this.findRow(id, this.tableFor(tableName));
        if (!row) return null;

        const result = this.createDomainObject();
        result.id = id;
        this.load(result);
        return result;
    }

    protected tableFor(name: string): DataTable {
        return Gateway.Data.Tables[name]; // Example: Gateway object is used to fetch table
    }

    protected findRow(id: number, table: DataTable): DataRow | null {
        const filter = `id = ${id}`;
        const results = table.select(filter);
        return results.length === 0 ? null : results[0];
    }

    public createDomainObject(): Footballer {
        return new Footballer(); // 기본적으로 Footballer 객체 생성
    }

    protected load(domainObject: Footballer): void {
        // 데이터를 Footballer 객체에 로드하는 로직
        throw new Error("Load method not implemented.");
    }

    public update(arg: DomainObject): void {
        this.save(arg);
    }

    protected save(arg: DomainObject): void {
        // 로직 구현
        throw new Error("에러");
    }

    public insert(obj: DomainObject) {
        obj.id = GetNextID();
        AddRow(obj);
        this.save(obj);
        return obj.id;
    }

    protected addRow(obj: DomainObject) {
    }

    protected InsertRow(arg: DomainObject, table: DataTable) {
        const row = table.NewRow();
        row["id"] = arg.id;
        table.rows.add(row);
    }

    public delete(obj: DomainObject) {
    }
}
