import {DomainObject} from "./sub/domainObject";
import {DataRow}      from "./sub/dataRow";

export abstract class Mapper {
    public AbstractFind(id: number, tablename: string) {
        const row: DataRow = FindRow(id, tableFor(tablename));
        if (row === null) return null;
        else {
            const result: DomainObject = CreateDomainObject();
            result.id = id;
            Load(result);
            return result;
        }
    }

    protected tableFor(name: string): DataTable {
        return Gateway.Data.Tables[name];
    }

    protected FindRow(id: number, table: DataTable): DataRow {
        const filter: string = string.format("id = {0}", id);
        const result: DataRow[] = table.Select(filter);
        return (result.Length === 0) ? null : result[0];
    }

    protected FindRow(id: number, tablename: string): DataRow {
        return this.FindRow(id, this.tableFor(tablename));
    }

    protected abstract CreateDomainObject(): DomainObject;
}
