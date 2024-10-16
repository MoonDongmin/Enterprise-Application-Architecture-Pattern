import {Gateway}     from "./gateway";
import {IdentityMap} from "./needData/identityMap";
import {DataTable}   from "./needData/dataTable";

export abstract class Mapper {
    public gateway: Gateway;
    private identityMap: IdentityMap = {}; // TypeScript 에서는 Hashtable 대신 객체 사용

    constructor(gateway: Gateway) {
        this.gateway = gateway;
    }

    private get table(): DataTable {
        return this.gateway.Data.Tables[this.tableName];
    }

    public abstract get tableName(): string;

    protected abstract createDomainObject(): any; // 반환 타입을 구체화해야 할 수 있음

    protected load(domainObject: any, row: DataRow): void {
        domainObject.id = row["id"] as number; // ID 속성 로드
    }; // 로딩 메서드 추가

    public abstractFind(id: number): any | null {
        const row = this.findRow(id);
        if (!row) return null;

        const result = this.createDomainObject();
        this.load(result, row);
        return result;
    }

    private findRow(id: number): DataRow | null {
        const filter = `id = ${id}`;
        const results = this.table.select(filter); // select 메서드 정의 필요

        if (results.length === 0) return null;
        else return results[0];
    }

    public update(arg: DomainObject): void {
        save(arg, this.findRow(arg.id));
    }

    public insert(arg: DomainObject): number {
        const row: DataRow = this.table.newRow(); // 새로운 데이터 행 생성
        arg.id = this.getNextID(); // 새로운 ID 할당
        row["id"] = arg.id; // ID 저장
        this.save(arg, row); // 객체를 데이터 행에 저장
        this.table.rows.add(row); // 데이터 테이블에 행 추가
        return arg.id; // 새로운 ID 반환
    }

    public delete(obj: DomainObject): void {
        const row: DataRow | null = this.findRow(obj.id); // ID로 데이터 행 찾기
        if (row) {
            row.delete(); // 데이터 행 삭제
        } else {
            throw new Error(`Row with ID ${obj.id} not found.`); // 행이 없을 경우 오류 발생
        }
    }
}
